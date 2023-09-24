const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");

  let args = [
    "0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70",
    "0x34DBf5d9946C50a2B06d1e6A5755437352a3e6BB",
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
module.exports.tags = ["all", "Gnosis"];
