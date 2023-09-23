const { network } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("------------------------------------------------------------");
  //const decim = ethers.utils.parseEther("1");
  let facetCut = [];
  //Deploying Diamond Init
  const timeStamp = (await ethers.provider.getBlock("latest")).timestamp;
  args = [timeStamp + 10];
  const Lock = await deploy("Lock", {
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
module.exports.tags = ["all", "Diamond"];
