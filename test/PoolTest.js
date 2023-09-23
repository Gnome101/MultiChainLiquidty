const { ethers } = require("hardhat");
const { assert } = require("chai");
const bigDecimal = require("js-big-decimal");

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
    const hook = 0x0000000000000000000000000000;
    const adresses = [EPICDAI.address, HOG.address];
    adresses.sort();
    const poolKey = {
      currency0: adresses[0],
      currency1: adresses[1],
      fee: 3000,
      tickSpacing: 60,
      hooks: 0x0000000000000000000000000000,
    };

    await poolManager.initialize();
  });
});
