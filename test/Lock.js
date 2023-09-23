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
    Lock = await ethers.getContract("Lock");
  });
  it("can do stuff", async () => {
    const num = await Lock.getNum();
    console.log(num);
    await Lock.setNum(3);
    const num1 = await Lock.getNum();
    console.log(num1);
  });
});
