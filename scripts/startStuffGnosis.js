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
  const Manager = await ethers.getContractAt("Manager", gnosisManager);
  console.log((await Manager.count()).toString());
  console.log(await Manager.proxyAddy());
  // await Manager.setProxyToken("0x55a641B287C40A10464052e86eD40086D51E3db5");
  // await Manager.setISM(gnosisISM);
  // await Manager.addDomain(scrollDomain, scrollManager);
  // // // //HOG FOR GNOSIS AND EPIC FOR SCROLL
  // const HOG = await ethers.getContract("HOG");
  // await HOG.approve(Manager.target, "100000000000000000000000");
  // const sqrtPrice = calculateSqrtPriceX96(1, 18, 18);

  // //await Manager.initializeProxyPool(HOG.target, sqrtPrice.toFixed()`, "0x");
  // const lowerBound = 0 - 60 * 10;
  // const upperBound = 0 + 60 * 10;
  // await HOG.mint();
  // await HOG.mint();
  // await HOG.mint();
  // const amount = "100000000000000000000"; //100

  // await Manager.createPosition(HOG.target, amount, lowerBound, upperBound);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
