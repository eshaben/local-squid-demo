// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyTok = await hre.ethers.getContractFactory("MyTok");
  const myTok = await MyTok.attach("0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3");

  const value = hre.ethers.utils.parseUnits('10', 'ether');

  // Transfer to Baltathar
  console.log("Transferring to Baltathar")
  await myTok.transfer('0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0', value)

  // Transfer to Charleth
  console.log("Transferring to Charleth")
  await myTok.transfer('0x798d4Ba9baf0064Ec19eB4F0a1a45785ae9D6DFc', value)

  // Transfer to Dorothy
  console.log("Transferring to Dorothy")
  await myTok.transfer('0x773539d4Ac0e786233D90A233654ccEE26a613D9', value)

  // Transfer to Ethan
  console.log("Transferring to Ethan")
  await myTok.transfer('0xFf64d3F6efE2317EE2807d223a0Bdc4c0c49dfDB', value)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
