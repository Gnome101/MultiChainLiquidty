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
  // args = [500000];
  // const PoolManager = await deploy("PoolManager", {
  //   from: deployer,
  //   args: args,
  //   log: true,
  //   blockConfirmations: 2,
  // });
  const scrollPoolManagerAddress = "0xA449635FaAA6b5a45a568fCe217Bb7921c992285";
  const gnosisPoolManagerAddress = "0x57C1A6F0acF8c55534678D0Feac25Eef9B66E238";

  args = [scrollPoolManagerAddress];
  const Router = await deploy("UniswapInteract", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });
  console.log("Chain", chainId);
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(
      Router.address,
      args,
      "contracts/UniswapInteract.sol:UniswapInteract"
    );
  }
  //Scro [MToken.address);
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
    await verify(
      HookFactory.address,
      args,
      "contracts/Utils/HooksFactory.sol:UniswapHooksFactory"
    );
  }
};
module.exports.tags = ["all", "Scroll"];
