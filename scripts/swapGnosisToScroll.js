const hre = require("hardhat");
const { calculateSqrtPriceX96 } = require("../utils/tokenTools");

async function main() {
  //const emptyISM
  const gnosisISM = "0x05A8F0bD730d7Ddf1F708CFbB5c465a7309cfA10";
  const scrollISM = "0x0781af3D35b9616E50eDF72fB4be5E655bFbE7dD";
  const gnosisManager = "0x8c38Ad390eefDE0Ec145F80cdF8350cbb5Fb4962";
  const scrollManager = "0x8c1698Ae4c9F5f9b29681ACcD0E6b8c88273ed44";
  const GnosisDomain = 100;
  const scrollDomain = 534351;
  const Manager = await ethers.getContractAt("Manager", gnosisManager);
  console.log((await Manager.count()).toString());
  const HOG = await ethers.getContract("HOG");
  const amount = "1000000000000";
  const DaiScroll = "0x62f02E0C7daEE5Fa55F3299dAF0b5b3435287D87";
  await HOG.approve(scrollManager, amount);

  await Manager.swapToOtherChain(
    HOG.target,
    amount,
    scrollDomain,
    DaiScroll,
    "0x19d96301865fdD07427db3c445508A051BC6D352",
    {
      value: ethers.parseEther("0.1"),
    }
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
