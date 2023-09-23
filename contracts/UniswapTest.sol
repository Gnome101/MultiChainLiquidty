// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

// make sure to update latest 'main' branch on Uniswap repository
import {IPoolManager, BalanceDelta} from "@uniswap/v4-core/contracts/PoolManager.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolId.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v4-core/contracts/types/PoolId.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@uniswap/v3-periphery/contracts/libraries/LiquidityAmounts.sol";
error SwapExpired();
error OnlyPoolManager();

using SafeERC20 for IERC20;
import "hardhat/console.sol";

contract UniSwapTest {
    using CurrencyLibrary for Currency;
    IPoolManager public poolManager;
    mapping(uint256 => uint256) actionChoice;
    mapping(uint256 => IPoolManager.ModifyPositionParams) modificaitons;
    mapping(uint256 => IPoolManager.SwapParams) swaps;
    uint256 modCounter;
    uint256 modSwap;

    constructor(IPoolManager _poolManager) {
        poolManager = _poolManager;
    }

    function getID(PoolKey memory poolKey) public pure returns (PoolId) {
        return PoolIdLibrary.toId(poolKey);
    }

    function addLiquidity(
        PoolKey calldata poolKey,
        IPoolManager.ModifyPositionParams calldata modifyLiquidtyParams,
        uint256 deadline
    ) public payable returns (uint256, uint256) {
        console.log(modCounter, "adding");
        modificaitons[modCounter] = modifyLiquidtyParams;
        bytes memory res = poolManager.lock(
            abi.encode(poolKey, 0, modCounter, deadline)
        );

        return abi.decode(res, (uint256, uint256));
    }

    function swap(
        PoolKey calldata poolKey,
        IPoolManager.SwapParams calldata swapParams,
        uint256 deadline
    ) public payable returns (uint256, uint256) {
        swaps[modSwap] = swapParams;
        bytes memory res = poolManager.lock(
            abi.encode(poolKey, 1, modSwap, deadline)
        );

        return abi.decode(res, (uint256, uint256));
    }

    function lockAcquired(
        bytes calldata data
    ) external returns (bytes memory res) {
        console.log("Hello!!");
        console.log(msg.sender, address(poolManager));
        if (msg.sender != address(poolManager)) {
            revert OnlyPoolManager();
        }

        (
            PoolKey memory poolKey,
            uint256 action,
            uint256 counter,
            uint256 deadline
        ) = abi.decode(data, (PoolKey, uint256, uint256, uint256));

        if (block.timestamp > deadline) {
            revert();
        }
        BalanceDelta delta;
        if (action == 0) {
            console.log("Modifying Position");
            delta = poolManager.modifyPosition(
                poolKey,
                modificaitons[counter],
                "0x"
            );
            modCounter++;
        }
        if (action == 1) {
            console.log("Swapping...");
            delta = poolManager.swap(poolKey, swaps[counter], "0x");
            modSwap++;
        }

        _settleCurrencyBalance(poolKey.currency0, delta.amount0());
        _settleCurrencyBalance(poolKey.currency1, delta.amount1());
        res = abi.encode(delta.amount0(), delta.amount1());
        //return new bytes();
    }

    function _settleCurrencyBalance(
        Currency currency,
        int128 deltaAmount
    ) private {
        console.log("lock");
        console.log(msg.sender);
        console.log(uint128(deltaAmount));
        if (deltaAmount < 0) {
            console.log("Amount:", uint128(-deltaAmount));
            poolManager.take(currency, msg.sender, uint128(-deltaAmount));
            return;
        }

        if (currency.isNative()) {
            poolManager.settle{value: uint128(deltaAmount)}(currency);
            return;
        }
        IERC20(Currency.unwrap(currency)).safeTransfer(
            address(poolManager),
            uint128(deltaAmount)
        );
        poolManager.settle(currency);
    }

    function getLiquidityAmount(
        int24 currentTick,
        int24 lowerTick,
        int24 upperTick,
        uint256 amount0,
        uint256 amount1
    ) external pure returns (uint128) {
        return
            LiquidityAmounts.getLiquidityForAmounts(
                TickMath.getSqrtRatioAtTick(currentTick),
                TickMath.getSqrtRatioAtTick(lowerTick),
                TickMath.getSqrtRatioAtTick(upperTick),
                amount0,
                amount1
            );
    }
}
