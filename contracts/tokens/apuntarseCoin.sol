// SPDX-License-Identifier: AFL-3.0

pragma solidity >=0.4.23;

//Simple Coin like contract to reward the players

contract apuntarseCoin {

	string private name;
    string private symbol;
    uint8 private decimals;
    uint256 private totalSupply;

	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
        name = "HackOnApuntarse";
        symbol = "HackOnA";
        decimals = 18;

	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function payCoins(address from, uint amount) public returns(bool) {
		if (balances[from] < amount) return false;
		balances[msg.sender] += amount;
		balances[from] -= amount;
		emit Transfer(from, msg.sender, amount);
		return true;
	
	}

	function balanceOf(address account) public view returns(uint) {
		return balances[account];
	}

	function mint() public {
		totalSupply = totalSupply + 1000;
		balances[msg.sender] = balances[msg.sender] + 1000;

		emit Transfer(address(0), msg.sender, 1000);
	}
}
