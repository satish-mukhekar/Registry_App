const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Registry contract...");

  // Get the contract factory
  const Registry = await ethers.getContractFactory("Registry");

  // Deploy with initial supply of 1,000,000 tokens
  const initialSupply = ethers.parseUnits("1000000", 18);
  const registry = await Registry.deploy(initialSupply);

  await registry.waitForDeployment();

  const contractAddress = await registry.getAddress();
  console.log("Registry deployed to:", contractAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: "polygonAmoy",
    deployer: (await ethers.getSigners())[0].address,
    initialSupply: "1000000",
    deploymentTime: new Date().toISOString()
  };

  const fs = require("fs");
  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment.json");
  console.log("Contract deployed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Polygon Amoy Testnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });