// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {Currency} from "@uniswap/v4-core/contracts/types/Currency.sol";

import {CallType, UniswapV4Router} from "./UniswapV4Router.sol";
import {UniswapV4RouterLibrary} from "./UniswapV4RouterLibrary.sol";
import "hardhat/console.sol";

contract UniswapV4Caller {
    using UniswapV4RouterLibrary for UniswapV4Router;

    UniswapV4Router public immutable router;
    IPoolManager public immutable manager;
    // TODO replace with transient storage
    // Default to 1 to save gas
    // Is only used by withdraw
    address caller = address(1);

    constructor(IPoolManager _manager, UniswapV4Router _router) {
        router = _router;
        manager = _manager;
    }

    function addLiquidity(
        PoolKey memory poolKey,
        address sender,
        int24 tickLower,
        int24 tickUpper,
        int256 liquidityAmount
    ) external returns (bytes[] memory results) {
        console.log("Adding");
        results = router.addLiquidity(
            address(this),
            manager,
            poolKey,
            sender,
            tickLower,
            tickUpper,
            liquidityAmount
        );
    }

    function addLiquidityCallback(
        bytes memory callData,
        bytes memory resultData
    ) external {
        console.log("Howdy");
        UniswapV4RouterLibrary.addLiquidityCallback(callData, resultData);
    }

    function removeLiquidity(
        PoolKey memory poolKey,
        address recipient,
        int24 tickLower,
        int24 tickUpper,
        int256 liquidityAmount
    ) external returns (bytes[] memory results) {
        results = router.removeLiquidity(
            address(this),
            manager,
            poolKey,
            recipient,
            tickLower,
            tickUpper,
            liquidityAmount
        );
    }

    function removeLiquidityCallback(
        bytes memory callData,
        bytes memory resultData
    ) external {
        UniswapV4RouterLibrary.removeLiquidityCallback(callData, resultData);
    }

    function swap(
        PoolKey memory poolKey,
        address swapper,
        address recipient,
        Currency fromCurrency,
        int256 swapAmount
    ) external returns (bytes[] memory results) {
        results = router.swap(
            address(this),
            manager,
            poolKey,
            swapper,
            recipient,
            fromCurrency,
            swapAmount
        );
    }

    function swapCallback(
        bytes memory callData,
        bytes memory resultData
    ) external {
        console.log("Hello!");
        UniswapV4RouterLibrary.swapCallback(callData, resultData);
    }

    function swapManagerTokens(
        PoolKey memory poolKey,
        Currency fromCurrency,
        int256 fromAmount,
        address recipient
    ) external returns (bytes[] memory results) {
        // Store the caller so we can use it in the callback
        caller = msg.sender;

        results = router.swapManagerTokens(
            address(this),
            manager,
            poolKey,
            fromCurrency,
            fromAmount,
            recipient
        );

        // Clear the caller. Ideally this would be transient storage so no need to clear
        caller = address(1);
    }

    function swapManagerTokensCallback(
        bytes memory callData,
        bytes memory resultData
    ) external {
        UniswapV4RouterLibrary.swapManagerTokensCallback(callData, resultData);
    }

    function deposit(
        address token,
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bytes[] memory results) {
        results = router.deposit(manager, token, sender, recipient, amount);
    }

    function withdraw(
        address token,
        address recipient,
        uint256 amount
    ) external returns (bytes[] memory results) {
        // Store the caller so we can use it in the callback
        caller = msg.sender;
        results = router.withdraw(
            address(this),
            manager,
            token,
            recipient,
            amount
        );

        // Clear the caller. Ideally this would be transient storage so no need to clear
        caller = address(1);
    }

    // is used by withdraw and managerSwap
    function transferFromCallerToPoolManager(
        address token,
        uint256 amount
    ) external {
        IERC1155(manager).safeTransferFrom(
            caller,
            address(manager),
            uint160(token),
            amount,
            ""
        );
    }

    function flashLoan(
        address token,
        uint256 amount,
        address callbackTarget,
        CallType callbackType,
        bytes calldata callbackData
    ) external returns (bytes[] memory results) {
        results = router.flashLoan(
            manager,
            token,
            amount,
            callbackTarget,
            callbackType,
            callbackData
        );
    }
}