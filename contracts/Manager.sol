// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "./UniswapInteract.sol";
import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import "./Proxy.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/PoolManager.sol";
import "@uniswap/v3-periphery/contracts/libraries/LiquidityAmounts.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

contract myThing {
    UniswapInteract public immutable uniswapInteract;
    IPoolManager public immutable poolManager;
    Proxy public proxyToken;
    address public proxyAddy;
    PoolKey public poolKey;
    mapping(address => bool) public approvedToken;

    constructor(address _uI, address _poolManager) {
        uniswapInteract = UniswapInteract(_uI);
        poolManager = IPoolManager(_poolManager);
    }

    function setProxyToken(address _proxyToken) public {
        proxyToken = Proxy(_proxyToken);
        proxyAddy = _proxyToken;
    }

    function createPosition(
        address token,
        uint256 tokenAmount,
        int24 lower,
        int24 upper
    ) public {
        uint128 liquidity = 0;

        uint160 sqrtA = TickMath.getSqrtRatioAtTick(lower);
        uint160 sqrtB = TickMath.getSqrtRatioAtTick(upper);
        if (token < proxyAddy) {
            //token is 0
            liquidity = LiquidityAmounts.getLiquidityForAmount0(
                sqrtA,
                sqrtB,
                tokenAmount
            );
        } else {
            liquidity = LiquidityAmounts.getLiquidityForAmount1(
                sqrtA,
                sqrtB,
                tokenAmount
            );
        }
        //uniswapInteract
        uniswapInteract.addLiquidity(
            poolKey,
            IPoolManager.ModifyPositionParams(lower, upper, int128(liquidity)),
            block.timestamp + 10000000
        );
    }

    function swap(address token, uint256 tokenAmount) public {
        //uniswapInteract
        uniswapInteract.swap(
            poolKey,
            IPoolManager.ModifyPositionParams(lower, upper, int128(liquidity)),
            block.timestamp + 10000000
        );
    }
}
