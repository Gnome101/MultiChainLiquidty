// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "./UniswapInteract.sol";
import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";

contract myThing {
    UniswapInteract public immutable uniswapI;
    IPoolManager public immutable poolManager;
    IERC20 public proxyToken;
    mapping(address => bool) public approvedToken;

    constructor(address _uI, address _poolManager) {
        uniswapI = UniswapInteract(_uI);
        poolManager = IPoolManager(_poolManager);
    }
}
