// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.19;

// contract UniswapHooksFactory {
//     // function deploy(
//     //     address owner,
//     //     address poolManager,
//     //     bytes32 salt
//     // ) external returns (address) {
//     //     return address(new UniswapHooks{salt: salt}(owner, poolManager));
//     // }

//     function getPrecomputedHookAddress(
//         address owner,
//         address poolManager,
//         bytes32 salt
//     ) external view returns (address) {
//         bytes32 bytecodeHash = keccak256(
//             abi.encodePacked(
//                 type(UniswapHooks).creationCode,
//                 abi.encode(owner, poolManager)
//             )
//         );
//         bytes32 hash = keccak256(
//             abi.encodePacked(bytes1(0xff), address(this), salt, bytecodeHash)
//         );
//         return address(uint160(uint256(hash)));
//     }
// }
