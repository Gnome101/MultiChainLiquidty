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
  for (let i = 0; i < 1500; i++) {
    salt = ethers.toBeHex(i);
    //console.log(salt);
    salt = ethers.zeroPadValue(salt, 32);
    //console.log(salt);
    // salt = ethers.zeroPadValue(
    //   "0x0000000000000000000000000000000000000000000000000000000000000357",
    //   32
    // );
    let expectedAddress = await hookFactory.getPrecomputedHookAddress(
      owner,
      poolManager.target,
      salt
    );
    finalAddress = expectedAddress;
    //console.log(i, "Address:", expectedAddress);
    expectedAddress = expectedAddress;
    if (_doesAddressStartWith(expectedAddress, 0x08)) {
      console.log("this is the right salt", salt);
      break;
    }
  }

  function _doesAddressStartWith(_address, _prefix) {
    // console.log(_address.substring(0, 4), ethers.toBeHex(_prefix).toString());
    return _address.substring(0, 4) == ethers.toBeHex(_prefix).toString();
  }
  await hookFactory.deploy(poolManager.target, salt);
  console.log("Deployed with address:", finalAddress);
  console.log("Chain", chainId);
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(Lock.address, args);
  }
};
module.exports.tags = ["all", "Pool", "Local"];
