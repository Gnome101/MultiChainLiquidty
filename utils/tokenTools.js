const Decimal = require("decimal.js");
const Q192 = Decimal.pow(2, 192);
module.exports = {
  calculateSqrtPriceX96: (price, token0Dec, token1Dec) => {
    price = new Decimal(price);
    price = price.times(
      new Decimal(token1Dec - token0Dec === 0 ? 1 : token1Dec - token0Dec)
    );
    //onsole.log(price);
    //console.log(Q192);
    ratioX96 = price.times(Q192);
    sqrtPriceX96 = ratioX96.sqrt().trunc();
    return sqrtPriceX96;
  },
  // getSalt: (){

  // }
};
