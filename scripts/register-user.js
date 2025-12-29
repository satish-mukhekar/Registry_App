const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Read deployment info
  const deploymentInfo = JSON.parse(fs.readFileSync("deployment.json", "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  // Get contract instance
  const Registry = await ethers.getContractFactory("Registry");
  const registry = Registry.attach(contractAddress);

  // The recipient address that needs to be registered
  const recipientAddress = "0x0429fbce45b29e04fa121cdc56b3069a63e67c25";
  
  console.log("Checking registration status for:", recipientAddress);
  
  try {
    const user = await registry.users(recipientAddress);
    console.log("Current status:", {
      exists: user.exists,
      status: user.status,
      name: user.name,
      age: user.age.toString(),
      city: user.city
    });

    if (!user.exists) {
      console.log("\n❌ User is not registered.");
      console.log("To register this user, they need to:");
      console.log("1. Connect their wallet to the DApp");
      console.log("2. Fill out the registration form");
      console.log("3. Submit the registration transaction");
      console.log("\nOR you can register them manually if you have their private key:");
      console.log("Note: This requires the user's private key and should only be done with permission!");
    } else if (!user.status) {
      console.log("\n⚠️ User is registered but inactive.");
      console.log("As contract owner, you can activate them:");
      
      const [owner] = await ethers.getSigners();
      const contractOwner = await registry.owner();
      
      if (owner.address.toLowerCase() === contractOwner.toLowerCase()) {
        console.log("Activating user...");
        const tx = await registry.changeUserStatus(recipientAddress, true);
        await tx.wait();
        console.log("✅ User activated successfully!");
      } else {
        console.log("❌ Only the contract owner can activate users.");
      }
    } else {
      console.log("✅ User is registered and active. Transfers should work!");
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });