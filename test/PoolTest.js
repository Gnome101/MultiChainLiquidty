const { ethers } = require("hardhat");
const { assert } = require("chai");
const bigDecimal = require("js-big-decimal");
const { calculateSqrtPriceX96 } = require("../utils/tokenTools");
describe("Pool Test ", async function () {
  let poolManager;
  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    user = accounts[1];
    await deployments.fixture(["all"]);
    poolManager = await ethers.getContract("PoolManager");
    HOG = await ethers.getContract("HOG");
    EPICDAI = await ethers.getContract("EPICDAI");
  });
  it("can initialze my own pool", async () => {
    //I need key, sqrtPrice, and hookData
    const hook = "0x0000000000000000000000000000";
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
    const sqrtPrice = calculateSqrtPriceX96(10, 18, 18);
    console.log(sqrtPrice);
    const hookData = hook;

    await poolManager.initialize(poolKey, sqrtPrice, hookData);
  });
});
