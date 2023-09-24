const hre = require("hardhat");
const { calculateSqrtPriceX96 } = require("../utils/tokenTools");

async function main() {
  //const emptyISM
  const gnosisISM = "0x05A8F0bD730d7Ddf1F708CFbB5c465a7309cfA10";
  const scrollISM = "0x0781af3D35b9616E50eDF72fB4be5E655bFbE7dD";
  const gnosisManager = "0x8c05fEE7945076d7FB87a9318702eF7858Db19D5";
  const scrollManager = "0x8c1698Ae4c9F5f9b29681ACcD0E6b8c88273ed44";
  const GnosisDomain = 100;
  const scrollDomain = 534351;
  const Manager = await ethers.getContractAt("Manager", scrollManager);
  console.log((await Manager.count()).toString());
  // await Manager.setProxyToken("0x9afb83aEF9d3B90662c58CAEd1F74BBCdfB4717b");
  // await Manager.setISM(scrollISM);
  await Manager.addDomain(GnosisDomain, gnosisManager);
  // //HOG FOR GNOSIS AND EPIC FOR SCROLL
  // const EPICDAI = await ethers.getContract("EPICDAI");
  // await EPICDAI.approve(Manager.target, "1000000000000000000000000");
  // const sqrtPrice = calculateSqrtPriceX96(1, 18, 18);
  // //console.log(await Manager.proxyAddy());
  // // await Manager.initializeProxyPool(EPICDAI.target, sqrtPrice.toFixed(), "0x");
  // const lowerBound = 0 - 60 * 10;
  // const upperBound = 0 + 60 * 10;
  // await EPICDAI.mint();
  // await EPICDAI.mint();
  // await EPICDAI.mint();
  // const amount = "100000000000000000000"; //100

  // await Manager.createPosition(EPICDAI.target, amount, lowerBound, upperBound);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
