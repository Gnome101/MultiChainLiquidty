const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");

  let args = [
    "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    "0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a",
  ];
  //Mailbox -> igp
  //Deploying Diamond Init
  const Manager = await deploy("Manager", {
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
module.exports.tags = ["all", "Arb"];
