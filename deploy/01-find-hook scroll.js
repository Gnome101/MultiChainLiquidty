const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { ethers } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  //First I need to find hook address that works
  const owner = deployer;
  //const poolManager = await ethers.getContract("PoolManager");
  const uniswapInteract = await ethers.getContract("UniswapInteract");
  const scrollPoolManagerAddress = "0xA449635FaAA6b5a45a568fCe217Bb7921c992285";
  const gnosisPoolManagerAddress = "0x57C1A6F0acF8c55534678D0Feac25Eef9B66E238";
  const hookFactory = await ethers.getContract("UniswapHooksFactory");
  const scrollMailBox = "0x07A9c3e93EA8A5A01695572d6851329564A77eF8";
  const scrollIGP = "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9";

  const gnosisMailBox = "0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70";
  const gnosisIGP = "0x34DBf5d9946C50a2B06d1e6A5755437352a3e6BB";
  let salt;
  let finalAddress;
  for (let i = 1150; i < 3000; i++) {
    salt = ethers.toBeHex(i);
    //console.log(salt);
    salt = ethers.zeroPadValue(salt, 32);
    //console.log(salt);
    // salt = ethers.zeroPadValue(
    //   "0x0000000000000000000000000000000000000000000000000000000000000128",
    //   32
    // );

    let expectedAddress = await hookFactory.getPrecomputedHookAddress(
      owner,
      uniswapInteract.target,
      scrollPoolManagerAddress,
      scrollMailBox,
      scrollIGP,
      salt
    );
    finalAddress = expectedAddress;
    //console.log(i, "Address:", expectedAddress);
    expectedAddress = expectedAddress;
    console.log(finalAddress);
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
    scrollPoolManagerAddress,
    scrollMailBox,
    scrollIGP,
    salt
  );
  console.log("Deployed with address:", finalAddress);
  console.log("Chain", chainId);
};
module.exports.tags = ["all", "Scroll"];
