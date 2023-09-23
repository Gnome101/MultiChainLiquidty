// SPDX-License-Identifier: UNLISCENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Proxy is ERC20 {
    address immutable manager;

    constructor(address _manager) ERC20("PROXY", "PRX") {
        manager = _manager;
    }

    function mint(uint256 amount) public {}
}
