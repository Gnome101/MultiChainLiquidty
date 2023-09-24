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
  const EPICDAI = await ethers.getContract("EPICDAI");
  const amount = "10000000000000000000";
  const GnosisHOG = "0xDCbf6ECf42ab6a2b9c4F2473026303a383692238";
  await EPICDAI.approve(scrollManager, amount);

  await Manager.swapToOtherChain(
    EPICDAI.target,
    amount,
    GnosisDomain,
    GnosisHOG,
    "0x19d96301865fdD07427db3c445508A051BC6D352",
    {
      value: ethers.parseEther("0.05"),
    }
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
