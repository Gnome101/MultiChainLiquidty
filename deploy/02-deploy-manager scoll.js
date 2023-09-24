const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  //const decim = ethers.utils.parseEther("1");
  let args;
  const scrollPoolManagerAddress = "0xA449635FaAA6b5a45a568fCe217Bb7921c992285";
  const gnosisPoolManagerAddress = "0x57C1A6F0acF8c55534678D0Feac25Eef9B66E238";
  let hookFactory = await ethers.getContract("UniswapHooksFactory");
  const uniswapInteract = await ethers.getContract("UniswapInteract");
  const hook = await hookFactory.hooks(0);
  console.log("Address:", hook);
  //const poolManager = await ethers.getContract("PoolManager");

  const manager = await ethers.getContractAt("Manager", hook);
  const scrollMailBox = "0x07A9c3e93EA8A5A01695572d6851329564A77eF8";
  const scrollIGP = "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9";

  const gnosisMailBox = "0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70";
  const gnosisIGP = "0x34DBf5d9946C50a2B06d1e6A5755437352a3e6BB";

  args = [
    uniswapInteract.target,
    scrollPoolManagerAddress,
    scrollMailBox,
    scrollIGP,
  ];
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(hook, args, "contracts/Manager.sol:Manager");
  }
  args = [hook];
  const ProxyToken = await deploy("Proxy", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(ProxyToken.address, args, "contracts/Proxy.sol:Proxy");
  }
  await manager.setProxyToken(ProxyToken.address);
};
module.exports.tags = ["all", "Scroll"];
