const { ethers } = require("hardhat");
const { assert } = require("chai");
const bigDecimal = require("js-big-decimal");
const { calculateSqrtPriceX96 } = require("../utils/tokenTools");
const { default: Decimal } = require("decimal.js");
const { hexlify } = require("ethers");
describe("Pool Test ", async function () {
  let poolManager;
  let HOG;
  let EPICDAI;
  let router;
  let caller;
  let uniswapInteract;
  let hookFactory;
  beforeEach(async () => {});
  it("can initialze my own pool", async () => {
    console.log("Hello");
  });
});
