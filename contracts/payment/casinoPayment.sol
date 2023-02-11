// SPDX-License-Identifier: AFL-3.0

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
        hashed_flag = "234u78o97867564q32ewqdesfthy7ui6867";

    }

    function pay_flag() public {
        require(coin.balanceOf(msg.sender) >= 2, "U broke");
        coin.payCoins(msg.sender, 2);

        winners[msg.sender] = true;
    }

    function getFlagHash() public view returns (string memory) {
        require(winners[msg.sender] == true, "No eres uno de los ganadores");
        return hashed_flag;
    }
}