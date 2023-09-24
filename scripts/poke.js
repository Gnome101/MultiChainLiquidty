const hre = require("hardhat");
async function main() {
  const gnosisManager = "0x8c80d4c2D11B33a9c755176862Bf97e9452Be9e4";
  const Manager = await ethers.getContractAt("Manager", gnosisManager);

  console.log((await Manager.count()).toString());

  await Manager.poke(534351, {
    value: ethers.parseEther("0.02"),
  });
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
