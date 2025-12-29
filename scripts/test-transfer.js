const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Read deployment info
  const deploymentInfo = JSON.parse(fs.readFileSync("deployment.json", "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  // Get contract instance
  const Registry = await ethers.getContractFactory("Registry");
  const registry = Registry.attach(contractAddress);

  // Get signers
  const [owner] = await ethers.getSigners();
  console.log("Testing with owner account:", owner.address);

  try {
    // Check owner info
    const contractOwner = await registry.owner();
    console.log("Contract owner:", contractOwner);
    console.log("Is owner:", owner.address.toLowerCase() === contractOwner.toLowerCase());

    // Check owner balance
    const balance = await registry.balanceOf(owner.address);
    console.log("Owner balance:", ethers.formatEther(balance), "TT");

    // Check if owner is registered
    const ownerUser = await registry.users(owner.address);
    console.log("Owner registration:", {
      exists: ownerUser.exists,
      status: ownerUser.status,
      name: ownerUser.name
    });

    // Test registration if not registered
    if (!ownerUser.exists) {
      console.log("\nRegistering owner...");
      const registerTx = await registry.userRegister("Contract Owner", 25, "Blockchain City", true);
      await registerTx.wait();
      console.log("Owner registered successfully!");
    }

    // Use the specific recipient address you provided
    const testRecipientRaw = "0x0429fbce45b29e04fa121cdc56b3069a63e67c25";
    const testRecipient = ethers.getAddress(testRecipientRaw); // Proper checksum
    
    console.log("\nChecking test recipient:", testRecipient);
    const recipientUser = await registry.users(testRecipient);
    console.log("Recipient registration:", {
      exists: recipientUser.exists,
      status: recipientUser.status,
      name: recipientUser.name
    });

    if (!recipientUser.exists) {
      console.log("❌ Recipient is not registered. They need to register first.");
    } else if (!recipientUser.status) {
      console.log("❌ Recipient is inactive. Owner needs to activate them.");
    } else {
      console.log("✅ Recipient is valid for transfers.");
      
      // Test transfer
      console.log("\nTesting transfer of 1 TT...");
      const transferAmount = ethers.parseEther("1");
      const transferTx = await registry.transfer(testRecipient, transferAmount);
      await transferTx.wait();
      console.log("✅ Transfer successful!");
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