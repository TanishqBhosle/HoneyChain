import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("HoneyTraceability", function () {
  let contract: any;
  let admin: HardhatEthersSigner;
  let beekeeper: HardhatEthersSigner;
  let collectionCenter: HardhatEthersSigner;
  let inspector: HardhatEthersSigner;
  let processor: HardhatEthersSigner;
  let distributor: HardhatEthersSigner;
  let otherAccount: HardhatEthersSigner;

  const batchId = ethers.id("BATCH-2026-001");
  const initialHash = ethers.id("initial-harvest-data");
  const eventHash = ethers.id("collection-event-data");

  beforeEach(async function () {
    [admin, beekeeper, collectionCenter, inspector, processor, distributor, otherAccount] =
      await ethers.getSigners();

    const Contract = await ethers.getContractFactory("HoneyTraceability");
    contract = await Contract.deploy(admin.address);

    // Grant roles
    await contract.connect(admin).grantRole(await contract.BEEKEEPER_ROLE(), beekeeper.address);
    await contract.connect(admin).grantRole(await contract.COLLECTION_CENTER_ROLE(), collectionCenter.address);
    await contract.connect(admin).grantRole(await contract.QUALITY_INSPECTOR_ROLE(), inspector.address);
    await contract.connect(admin).grantRole(await contract.PROCESSOR_ROLE(), processor.address);
    await contract.connect(admin).grantRole(await contract.DISTRIBUTOR_ROLE(), distributor.address);
  });

  describe("Deployment", function () {
    it("Should deploy with admin role", async function () {
      const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
      expect(await contract.hasRole(DEFAULT_ADMIN_ROLE, admin.address)).to.be.true;
    });

    it("Should grant all roles correctly", async function () {
      expect(await contract.hasRole(await contract.BEEKEEPER_ROLE(), beekeeper.address)).to.be.true;
      expect(await contract.hasRole(await contract.COLLECTION_CENTER_ROLE(), collectionCenter.address)).to.be.true;
      expect(await contract.hasRole(await contract.QUALITY_INSPECTOR_ROLE(), inspector.address)).to.be.true;
      expect(await contract.hasRole(await contract.PROCESSOR_ROLE(), processor.address)).to.be.true;
      expect(await contract.hasRole(await contract.DISTRIBUTOR_ROLE(), distributor.address)).to.be.true;
    });
  });

  describe("Batch Creation", function () {
    it("Should create a batch (beekeeper only)", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      const batch = await contract.getBatch(batchId);
      expect(batch.creator).to.equal(beekeeper.address);
      expect(await contract.totalBatches()).to.equal(1n);
    });

    it("Should reject duplicate batch creation", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      await expect(
        contract.connect(beekeeper).createBatch(batchId, initialHash)
      ).to.be.revertedWithCustomError(contract, "BatchAlreadyExists");
    });

    it("Should reject non-beekeeper creating a batch", async function () {
      await expect(
        contract.connect(otherAccount).createBatch(batchId, initialHash)
      ).to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should reject zero data hash", async function () {
      await expect(
        contract.connect(beekeeper).createBatch(batchId, ethers.ZeroHash)
      ).to.be.revertedWithCustomError(contract, "InvalidDataHash");
    });
  });

  describe("Batch Events", function () {
    beforeEach(async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
    });

    it("Should add batch event with correct role (Collection Center → Collected)", async function () {
      await contract.connect(collectionCenter).addBatchEvent(batchId, eventHash, 1); // Stage.Collected
      const batch = await contract.getBatch(batchId);
      expect(batch.currentStage).to.equal(1n);
    });

    it("Should add batch event (Inspector → QualityTested)", async function () {
      await contract.connect(inspector).addBatchEvent(batchId, eventHash, 2); // Stage.QualityTested
      const batch = await contract.getBatch(batchId);
      expect(batch.currentStage).to.equal(2n);
    });

    it("Should add batch event (Processor → Processed)", async function () {
      await contract.connect(processor).addBatchEvent(batchId, eventHash, 3); // Stage.Processed
      const batch = await contract.getBatch(batchId);
      expect(batch.currentStage).to.equal(3n);
    });

    it("Should reject unauthorized role for stage transition", async function () {
      // Beekeeper tries to move to Collected (requires COLLECTION_CENTER_ROLE)
      await expect(
        contract.connect(beekeeper).addBatchEvent(batchId, eventHash, 1)
      ).to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should chain hashes for tamper evidence", async function () {
      await contract.connect(collectionCenter).addBatchEvent(batchId, eventHash, 1);
      const history = await contract.getBatchHistory(batchId);
      // The second event hash should be a chained hash, not the raw eventHash
      expect(history[1].dataHash).to.not.equal(eventHash);
    });
  });

  describe("Ownership Transfer", function () {
    it("Should transfer ownership", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      await contract.connect(beekeeper).transferOwnership(batchId, otherAccount.address);
      const batch = await contract.getBatch(batchId);
      expect(batch.creator).to.equal(otherAccount.address);
    });

    it("Should reject non-owner transfer", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      await expect(
        contract.connect(otherAccount).transferOwnership(batchId, otherAccount.address)
      ).to.be.revertedWithCustomError(contract, "NotBatchOwner");
    });
  });

  describe("Batch Recall", function () {
    beforeEach(async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
    });

    it("Should allow admin to recall batch", async function () {
      await contract.connect(admin).recallBatch(batchId, "Contamination detected");
      const batch = await contract.getBatch(batchId);
      expect(batch.isRecalled).to.be.true;
      expect(batch.currentStage).to.equal(7n); // Stage.Recalled
    });

    it("Should allow inspector to recall batch", async function () {
      await contract.connect(inspector).recallBatch(batchId, "Failed quality test");
      const batch = await contract.getBatch(batchId);
      expect(batch.isRecalled).to.be.true;
    });

    it("Should reject recall from unauthorized account", async function () {
      await expect(
        contract.connect(otherAccount).recallBatch(batchId, "Unauthorized recall")
      ).to.be.revertedWithCustomError(contract, "AccessControlUnauthorizedAccount");
    });

    it("Should reject events on recalled batch", async function () {
      await contract.connect(admin).recallBatch(batchId, "Contaminated");
      await expect(
        contract.connect(collectionCenter).addBatchEvent(batchId, eventHash, 1)
      ).to.be.revertedWithCustomError(contract, "BatchIsRecalled");
    });
  });

  describe("Verification", function () {
    it("Should verify batch data (positive)", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      expect(await contract.verifyBatch(batchId, initialHash)).to.be.true;
    });

    it("Should verify batch data (negative)", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      expect(await contract.verifyBatch(batchId, ethers.id("FAKE_DATA"))).to.be.false;
    });

    it("Should return full batch history", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      await contract.connect(collectionCenter).addBatchEvent(batchId, eventHash, 1);

      const history = await contract.getBatchHistory(batchId);
      expect(history.length).to.equal(2);
      expect(history[0].stage).to.equal(0n); // Harvested
      expect(history[1].stage).to.equal(1n); // Collected
    });

    it("Should track total batches count", async function () {
      await contract.connect(beekeeper).createBatch(batchId, initialHash);
      await contract.connect(beekeeper).createBatch(ethers.id("BATCH-002"), initialHash);
      expect(await contract.totalBatches()).to.equal(2n);
    });
  });
});
