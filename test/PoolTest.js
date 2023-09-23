const { ethers } = require("hardhat");
const { assert } = require("chai");
const bigDecimal = require("js-big-decimal");

describe("Lock Test ", async function () {
  let Lock;
  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    user = accounts[1];
    await deployments.fixture(["all"]);
    poolManager = await ethers.getContract("PoolManager");
  });
  it("can read min and max tick spacing", async () => {
    const minSpacing = await poolManager.MIN_TICK_SPACING();
    const maxSpacing = await poolManager.MAX_TICK_SPACING();
    console.log(minSpacing.toString(), maxSpacing.toString());
  });
});
