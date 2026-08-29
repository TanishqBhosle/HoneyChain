import { ethers } from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS not set in .env");
  }

  const contract = await ethers.getContractAt("HoneyTraceability", contractAddress);
  const [deployer, beekeeper, collectionCenter, inspector, processor, distributor] = await ethers.getSigners();

  const BEEKEEPER_ROLE = await contract.BEEKEEPER_ROLE();
  const COLLECTION_CENTER_ROLE = await contract.COLLECTION_CENTER_ROLE();
  const QUALITY_INSPECTOR_ROLE = await contract.QUALITY_INSPECTOR_ROLE();
  const PROCESSOR_ROLE = await contract.PROCESSOR_ROLE();
  const DISTRIBUTOR_ROLE = await contract.DISTRIBUTOR_ROLE();

  console.log("Granting roles for demo...\n");

  const roles = [
    { role: BEEKEEPER_ROLE, name: "BEEKEEPER", address: beekeeper.address },
    { role: COLLECTION_CENTER_ROLE, name: "COLLECTION_CENTER", address: collectionCenter.address },
    { role: QUALITY_INSPECTOR_ROLE, name: "QUALITY_INSPECTOR", address: inspector.address },
    { role: PROCESSOR_ROLE, name: "PROCESSOR", address: processor.address },
    { role: DISTRIBUTOR_ROLE, name: "DISTRIBUTOR", address: distributor.address },
  ];

  for (const { role, name, address } of roles) {
    const tx = await contract.grantRole(role, address);
    await tx.wait();
    console.log(`  ✓ ${name} role granted to ${address}`);
  }

  console.log("\nAll roles granted successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
