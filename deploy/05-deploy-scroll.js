const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  let args = [
    "0x07A9c3e93EA8A5A01695572d6851329564A77eF8",
    "0x15A980eaaF79584C9Cfe473Bb575686cA113A8f9",
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
module.exports.tags = ["all", "Scroll"];
