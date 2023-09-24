const hre = require("hardhat");
async function main() {
  const Manager = await ethers.getContract("Manager");
  console.log((await Manager.count()).toString());

  await Manager.addDomain(421613, "0x757C586A39C7e07D62da23ABE6398a4F1De54AEf");
  await Manager.poke(421613, {
    value: ethers.parseEther("0.02"),
  });
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
