// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.19;

// import {IHookFeeManager} from "@uniswap/v4-core/contracts/interfaces/IHookFeeManager.sol";
// import {IDynamicFeeManager} from "@uniswap/v4-core/contracts/interfaces/IDynamicFeeManager.sol";
// import "../Random/BaseHook.sol";
// import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";

// contract UniswapHooks is BaseHook, IHookFeeManager, IDynamicFeeManager {
//     address public owner;
//     struct PoolKey {
//         /// @notice The lower currency of the pool, sorted numerically
//         Currency currency0;
//         /// @notice The higher currency of the pool, sorted numerically
//         Currency currency1;
//         /// @notice The pool swap fee, capped at 1_000_000. The upper 4 bits determine if the hook sets any fees.
//         uint24 fee;
//         /// @notice Ticks that involve positions must be a multiple of tick spacing
//         int24 tickSpacing;
//         /// @notice The hooks of the pool
//         IHooks hooks;
//     }

//     constructor(
//         address _owner,
//         IPoolManager _poolManager
//     ) BaseHook(_poolManager) {
//         owner = _owner;
//     }

//     function getHooksCalls() public pure override returns (Hooks.Calls memory) {
//         return
//             Hooks.Calls({
//                 beforeInitialize: true,
//                 afterInitialize: true,
//                 beforeModifyPosition: true,
//                 afterModifyPosition: true,
//                 beforeSwap: true,
//                 afterSwap: true,
//                 beforeDonate: true,
//                 afterDonate: true
//             });
//     }

//     /// @inheritdoc IHooks
//     function beforeInitialize(
//         address, // sender
//         PoolKey calldata, // key
//         uint160 // sqrtPriceX96
//     ) external pure override returns (bytes4) {
//         return IHooks.beforeInitialize.selector;
//     }

//     /// @inheritdoc IHooks
//     function afterInitialize(
//         address, // sender
//         PoolKey calldata, // key
//         uint160, // sqrtPriceX96
//         int24 // tick
//     ) external pure override returns (bytes4) {
//         return IHooks.afterInitialize.selector;
//     }

//     /// @inheritdoc IHooks
//     function beforeModifyPosition(
//         address, // sender
//         PoolKey calldata, // key
//         IPoolManager.ModifyPositionParams calldata // params
//     ) external pure override returns (bytes4) {
//         return IHooks.beforeModifyPosition.selector;
//     }

//     /// @inheritdoc IHooks
//     function afterModifyPosition(
//         address, // sender
//         PoolKey calldata, // key
//         IPoolManager.ModifyPositionParams calldata, // params
//         BalanceDelta // delta
//     ) external pure override returns (bytes4) {
//         return IHooks.afterModifyPosition.selector;
//     }

//     /// @inheritdoc IHooks
//     function beforeSwap(
//         address, // sender
//         PoolKey calldata, // key
//         IPoolManager.SwapParams calldata // params
//     ) external pure override returns (bytes4) {
//         return IHooks.beforeSwap.selector;
//     }

//     /// @inheritdoc IHooks
//     function afterSwap(
//         address, // sender
//         PoolKey calldata, // key
//         IPoolManager.SwapParams calldata, // params
//         BalanceDelta // delta
//     ) external pure override returns (bytes4) {
//         return IHooks.afterSwap.selector;
//     }

//     /// @inheritdoc IHooks
//     function beforeDonate(
//         address, // sender
//         PoolKey calldata, // key
//         uint256, // amount0
//         uint256 // amount1
//     ) external pure override returns (bytes4) {
//         return IHooks.beforeDonate.selector;
//     }

//     /// @inheritdoc IHooks
//     function afterDonate(
//         address, // sender
//         PoolKey calldata, // key
//         uint256, // amount0
//         uint256 // amount1
//     ) external pure override returns (bytes4) {
//         return IHooks.afterDonate.selector;
//     }

//     /// @inheritdoc IHookFeeManager
//     function getHookSwapFee(PoolKey calldata) external pure returns (uint8) {
//         return 100;
//     }

//     /// @inheritdoc IHookFeeManager
//     function getHookWithdrawFee(
//         PoolKey calldata
//     ) external pure returns (uint8) {
//         return 100;
//     }

//     /// @inheritdoc IDynamicFeeManager
//     function getFee(PoolKey calldata) external pure returns (uint24) {
//         return 10_000;
//     }
// }
