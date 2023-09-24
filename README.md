#MultiChain Liquidty

This project demonstrates a basic Hardhat use case. 
This project involves a proxy token that is paired with other tokens that are given on the site. These tokens are approved by an owner, and they are made in pools with the proxy token. This enables a single sided staking format. The project also utilizes uniswap v4 to faciliate the swaps, as well as hooks from unisawp v4 to add more features such as liquidity boosting. The boosting is done through the new donate function that was reently introduced in uniswap v4. The project aso uses hyperlane to faciliate cross-chain transactions which helps expand the reach of the program. Right now the system is able to go between Scroll and Gnosis, and it uses hyperlane to accomplish this. 


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
