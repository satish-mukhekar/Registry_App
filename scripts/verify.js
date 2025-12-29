const { run } = require("hardhat");
const fs = require("fs");

async function main() {
  // Read deployment info
  if (!fs.existsSync("deployment.json")) {
    console.error("deployment.json not found. Please deploy the contract first.");
    return;
  }

  const deploymentInfo = JSON.parse(fs.readFileSync("deployment.json", "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  const initialSupply = "1000000000000000000000000"; // 1M tokens with 18 decimals

  console.log("Verifying contract at:", contractAddress);
  console.log("Network:", deploymentInfo.network);
  console.log("Constructor arguments:", [initialSupply]);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [initialSupply],
    });
    
    console.log("✅ Contract verified successfully!");
    console.log("🔗 View on explorer:", `https://amoy.polygonscan.com/address/${contractAddress}#code`);
    
    // Update deployment info with verification status
    deploymentInfo.verified = true;
    deploymentInfo.verificationTime = new Date().toISOString();
    deploymentInfo.explorerUrl = `https://amoy.polygonscan.com/address/${contractAddress}#code`;
    
    fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
    console.log("📝 Updated deployment.json with verification status");
    
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("✅ Contract is already verified!");
      console.log("🔗 View on explorer:", `https://amoy.polygonscan.com/address/${contractAddress}#code`);
    } else {
      console.error("❌ Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });