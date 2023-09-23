const { ethers } = require("hardhat");
const { assert } = require("chai");
const bigDecimal = require("js-big-decimal");
const { calculateSqrtPriceX96 } = require("../utils/tokenTools");
describe("Pool Test ", async function () {
  let poolManager;
  let HOG;
  let EPICDAI;
  let router;
  let caller;
  let uniswapTest;
  let routeFacet;
  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    user = accounts[1];
    await deployments.fixture(["all"]);
    poolManager = await ethers.getContract("PoolManager");
    HOG = await ethers.getContract("HOG");
    EPICDAI = await ethers.getContract("EPICDAI");
    // router = await ethers.getContract("UniswapV4Router");
    // routeFacet = await ethers.getContract("RouterFacet");
    console.log("ROTUER", router);
    // caller = await ethers.getContract("UniswapV4Caller");
    uniswapTest = await ethers.getContract("UniSwapTest");
  });
  it("can initialze my own pool", async () => {
    //I need key, sqrtPrice, and hookData
    const hook = "0x0000000000000000000000000000000000000000";
    //console.log(EPICDAI);
    console.log(deployer.address);
    const adresses = [EPICDAI.target, HOG.target];
    adresses.sort();
    console.log(adresses);
    const poolKey = {
      currency0: adresses[0].toString().trim(),
      currency1: adresses[1].toString().trim(),
      fee: "3000",
      tickSpacing: "60",
      hooks: hook,
    };
    const sqrtPrice = calculateSqrtPriceX96(1, 18, 18);
    //console.log(sqrtPrice);
    const hookData = hook;
    await poolManager.initialize(poolKey, sqrtPrice.toFixed(), "0x");
    //Modify positon params
    const lowerBound = 0 - 60 * 10;
    const upperBound = 0 + 60 * 10;
    await HOG.mint();
    await EPICDAI.mint();
    await HOG.mint();
    await EPICDAI.mint();
    await HOG.mint();
    await EPICDAI.mint();
    const ModifyPositionParams = {
      tickLower: lowerBound,
      tickUpper: upperBound,
      liquidityDelta: "10000000",
    };
    const brick = "10000000000000000000000000000000"; //100.000
    const liquidtyAmount = "10000000000000000000";

    // await HOG.approve(router.target, brick.toString());
    // await EPICDAI.approve(router.target, brick.toString());
    // await HOG.transfer(caller.target, "10000000000000000000000");
    // await EPICDAI.transfer(caller.target, "10000000000000000000000");
    const timeStamp = (await ethers.provider.getBlock("latest")).timestamp;
    const amount = "1000000000000000000";
    await uniswapTest.addLiquidity(
      poolKey,
      ModifyPositionParams,
      timestamp + 100000000
    );
  });
});
