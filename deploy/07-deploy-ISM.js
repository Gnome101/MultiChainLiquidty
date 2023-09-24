const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  let args = [];
  const Manager = await deploy("EmptyIsm", {
    from: deployer,
    args: args,
    log: true,
    blockConfirmations: 2,
  });
  console.log("Chain", chainId);
  //   if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
  //     log("Verifying...");
  //     await verify(ManagerScroll.address, args);
  //   }
};
module.exports.tags = ["all", "Empty"];
