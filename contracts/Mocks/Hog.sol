// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HOG is ERC20 {
    constructor(string memory name, string memory sybmol) ERC20("HOG", "HOG") {
        //_mint(msg.sender, 1000 * 10 ** 18);
    }

    function mint() public {
        _mint(msg.sender, 10000 * 10 ** 18);
    }
}
