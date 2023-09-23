const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  //const decim = ethers.utils.parseEther("1");
  let args;
  //Deploying Diamond Init
  const timeStamp = (await ethers.provider.getBlock("latest")).timestamp;
  args = [500000];
  const PoolManager = await deploy("PoolManager", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });

  args = [PoolManager.address];
  const Router = await deploy("UniswapInteract", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });
  args = [];
  const HookFactory = await deploy("UniswapHooksFactory", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });

  console.log("Chain", chainId);
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(Lock.address, args);
  }
};
module.exports.tags = ["all", "Pool"];
