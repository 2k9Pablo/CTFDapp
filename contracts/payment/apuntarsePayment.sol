//SPDX-License-Identifier: AFL-3.0

pragma solidity 0.4.23;

import "../tokens/apuntarseCoin.sol";

contract apuntarsePayment {

    address public owner;
    mapping(address => bool) winners;
    apuntarseCoin public coin;
    string private hashed_flag;

    constructor(apuntarseCoin _coin) public {
        owner = msg.sender;
        coin = _coin;
        hashed_flag = "df412cf499822853aa22a6d459b1a7caa926b3d24e57c98ddcab6041a60d0107";

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