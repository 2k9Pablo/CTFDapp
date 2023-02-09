// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

import "../tokens/casinoCoin.sol";

contract casinoPayment {

    address public owner;
    mapping(address => bool) winners;
    casinoCoin public coin;
    string private hashed_flag;

    constructor(casinoCoin _coin) {
        owner = msg.sender;
        coin = _coin;
        hashed_flag = "f9bb8e8c330762612b5e8a4b09d985fea26e32696ab546082d4e3ef78452d886";

    }

    function pay_flag() public {
        require(coin.balanceOf(msg.sender) >= 1, "U broke");
        coin.payCoins(msg.sender, 1);

        winners[msg.sender] = true;
    }

    function getFlagHash() public view returns (string memory) {
        require(winners[msg.sender] == true, "No eres uno de los ganadores");
        return hashed_flag;
    }
}