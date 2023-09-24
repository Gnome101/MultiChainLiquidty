const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  //const decim = ethers.utils.parseEther("1");
  let args;

  let hookFactory = await ethers.getContract("UniswapHooksFactory");
  const poolManager = await ethers.getContract("PoolManager");
  const uniswapInteract = await ethers.getContract("UniswapInteract");
  const hook = await hookFactory.hooks(0);
  const manager = await ethers.getContractAt("Manager", hook);

  args = [
    uniswapInteract.target,
    poolManager.target,
    "0x07A9c3e93EA8A5A01695572d6851329564A77eF8",
    "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9",
  ];
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(manager.target, args, "contracts/Manager.sol:Manager");
  }
  args = [manager.target];
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
module.exports.tags = ["all", "Pool", "Local"];
