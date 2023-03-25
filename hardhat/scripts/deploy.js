const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  try {
    const contractInstance = await ethers.getContractFactory("Platform");
    const contract = await contractInstance.deploy();
    await contract.deployed();
    console.log("Contract address:", contract.address);
  } catch (error) {
    console.error(error);
  }

  console.log("Sleeping.....");
  await sleep(40000);

  try {
    await hre.run("verify:verify", {
      address: contract.address,

    });
  } catch (error) {
    console.error(error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});