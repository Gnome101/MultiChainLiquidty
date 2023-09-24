const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { ethers } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  //First I need to find hook address that works
  const owner = deployer;
  const poolManager = await ethers.getContract("PoolManager");
  const uniswapInteract = await ethers.getContract("UniswapInteract");

  const hookFactory = await ethers.getContract("UniswapHooksFactory");

  let salt;
  let finalAddress;
  for (let i = 0; i < 2500; i++) {
    salt = ethers.toBeHex(i);
    //console.log(salt);
    salt = ethers.zeroPadValue(salt, 32);
    //console.log(salt);
    salt = ethers.zeroPadValue(
      "0x0000000000000000000000000000000000000000000000000000000000000193",
      32
    );
    let expectedAddress = await hookFactory.getPrecomputedHookAddress(
      owner,
      uniswapInteract.target,
      poolManager.target,
      "0x07A9c3e93EA8A5A01695572d6851329564A77eF8",
      "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9",
      salt
    );
    finalAddress = expectedAddress;
    //console.log(i, "Address:", expectedAddress);
    expectedAddress = expectedAddress;
    if (_doesAddressStartWith(expectedAddress, 0x8c)) {
      console.log("this is the right salt", salt);
      break;
    }
  }

  function _doesAddressStartWith(_address, _prefix) {
    // console.log(_address.substring(0, 4), ethers.toBeHex(_prefix).toString());
    return _address.substring(0, 4) == ethers.toBeHex(_prefix).toString();
  }
  await hookFactory.deploy(
    uniswapInteract.target,
    poolManager.target,
    "0x07A9c3e93EA8A5A01695572d6851329564A77eF8",
    "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9",
    salt
  );
  console.log("Deployed with address:", finalAddress);
  console.log("Chain", chainId);
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(Lock.address, args);
  }
};
module.exports.tags = ["all", "Pool", "Local"];
