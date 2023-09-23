// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

// make sure to update latest 'main' branch on Uniswap repository
import {IPoolManager, BalanceDelta} from "@uniswap/v4-core/contracts/PoolManager.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolId.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v4-core/contracts/types/PoolId.sol";
error SwapExpired();
error OnlyPoolManager();

using SafeERC20 for IERC20;
import "hardhat/console.sol";

contract UniSwapTest {
    using CurrencyLibrary for Currency;
    IPoolManager public poolManager;

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
    ) public payable {
        poolManager.lock(abi.encode(poolKey, modifyLiquidtyParams, deadline));
    }

    function lockAcquired(bytes calldata data) external returns (bytes memory) {
        console.log("Hello!!");
        console.log(msg.sender, address(poolManager));
        if (msg.sender != address(poolManager)) {
            revert OnlyPoolManager();
        }

        (
            PoolKey memory poolKey,
            IPoolManager.ModifyPositionParams memory modifyParams,
            uint256 deadline
        ) = abi.decode(
                data,
                (PoolKey, IPoolManager.ModifyPositionParams, uint256)
            );

        if (block.timestamp > deadline) {
            revert();
        }

        BalanceDelta delta = poolManager.modifyPosition(
            poolKey,
            modifyParams,
            "0x"
        );

        _settleCurrencyBalance(poolKey.currency0, delta.amount0());
        _settleCurrencyBalance(poolKey.currency1, delta.amount1());

        return new bytes(0);
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
}
