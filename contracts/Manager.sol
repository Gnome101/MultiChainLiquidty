// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
// import "./UniswapInteract.sol";
// import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
// import "./Proxy.sol";
// import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolId.sol";
// import {IPoolManager} from "@uniswap/v4-core/contracts/PoolManager.sol";
import "hardhat/console.sol";
import "./Hyperlane/IMailbox.sol";
import "./Hyperlane/IInterchainGasPayMaster.sol";

import "./IMessageRecipient.sol";
import "./ISM/IMultisigISM.sol";

contract Manager is IMessageRecipient {
    // UniswapInteract public immutable uniswapInteract;
    // IPoolManager public immutable poolManager;
    // Proxy public proxyToken;
    // address public proxyAddy;
    // PoolKey public poolKey;
    // mapping(address => bool) public approvedToken;
    mapping(uint256 => address) public domainToAddress; //Domain to Manager address
    uint256 public count;

    //Hyperlane Stuff:
    IMailbox public immutable mailBox;
    IInterchainGasPaymaster public immutable igp;

    constructor(
        // address _uI,
        // address _poolManager,
        address _mailBox,
        address _igp
    ) {
        // uniswapInteract = UniswapInteract(_uI);
        // poolManager = IPoolManager(_poolManager);
        mailBox = IMailbox(_mailBox);
        igp = IInterchainGasPaymaster(_igp);
    }

    // function setProxyToken(address _proxyToken) public {
    //     proxyToken = Proxy(_proxyToken);
    //     proxyAddy = _proxyToken;
    // }

    function addDomain(uint256 domain, address managerAddress) public {
        domainToAddress[domain] = managerAddress;
    }

    // function createPosition(
    //     address token,
    //     uint256 tokenAmount,
    //     int24 lower,
    //     int24 upper
    // ) public {
    //     uint128 liquidity = 0;

    //     uint160 sqrtA = TickMath.getSqrtRatioAtTick(lower);
    //     uint160 sqrtB = TickMath.getSqrtRatioAtTick(upper);
    //     if (token < proxyAddy) {
    //         //token is 0
    //         liquidity = LiquidityAmounts.getLiquidityForAmount0(
    //             sqrtA,
    //             sqrtB,
    //             tokenAmount
    //         );
    //     } else {
    //         liquidity = LiquidityAmounts.getLiquidityForAmount1(
    //             sqrtA,
    //             sqrtB,
    //             tokenAmount
    //         );
    //     }
    //     //uniswapInteract
    //     uniswapInteract.addLiquidity(
    //         poolKey,
    //         IPoolManager.ModifyPositionParams(lower, upper, int128(liquidity)),
    //         block.timestamp + 10000000
    //     );
    // }

    // //zeroForOne - true - 4295128740
    // //zeroForOne - false - 1461446703485210103287273052203988822378723970342
    // function swap(address token, bool toProxy, int256 tokenAmount) public {
    //     //uniswapInteract
    //     bool zeroForOne;
    //     if (token < proxyAddy) {
    //         //token is 0
    //         zeroForOne = true;
    //         zeroForOne == toProxy ? true : false;
    //     } else {
    //         zeroForOne = false;
    //         zeroForOne == toProxy ? false : true;
    //     }
    //     uniswapInteract.swap(
    //         poolKey,
    //         IPoolManager.SwapParams(
    //             zeroForOne,
    //             tokenAmount,
    //             zeroForOne
    //                 ? 4295128740
    //                 : 1461446703485210103287273052203988822378723970342
    //         ),
    //         block.timestamp + 10000000
    //     );
    // }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external {
        count++;
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function poke(uint32 domain) public payable {
        uint256 gasAmount = 100000;
        bytes32 _messageId = mailBox.dispatch(
            domain,
            addressToBytes32(domainToAddress[domain]),
            abi.encode(msg.sender)
            //abi.encode(message)
        );

        // Pay from the contract's balance
        igp.payForGas{value: msg.value}(
            _messageId, // The ID of the message that was just dispatched
            domain, // The destination domain of the message
            gasAmount,
            address(this) // refunds are returned to this contract
        );
    }

    function interchainSecurityModule() external pure returns (address) {
        return 0xB45E9Dad573Ac59f61b05d06B8cc59728B5b9E6F;
    }

    receive() external payable {}
}
