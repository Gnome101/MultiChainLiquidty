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
  it("can initialze my own pool", async () => {});
});
