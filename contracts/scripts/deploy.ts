import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "POL");

  const HoneyTraceability = await ethers.getContractFactory("HoneyTraceability");
  const contract = await HoneyTraceability.deploy(deployer.address);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`HoneyTraceability deployed to: ${address}`);
  console.log(`\nAdd this to your .env file:`);
  console.log(`CONTRACT_ADDRESS=${address}`);

  // Optionally verify on PolygonScan
  if (process.env.POLYGONSCAN_API_KEY) {
    console.log("\nWaiting for block confirmations...");
    await contract.deploymentTransaction()?.wait(5);

    try {
      const { run } = await import("hardhat");
      await run("verify:verify", {
        address: address,
        constructorArguments: [deployer.address],
      });
      console.log("Contract verified on PolygonScan!");
    } catch (error: any) {
      console.log("Verification failed:", error.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
