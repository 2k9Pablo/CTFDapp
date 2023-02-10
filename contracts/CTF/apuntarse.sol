//SPDX-License-Identifier: AFL-3.0

pragma solidity 0.4.23;

import "../tokens/apuntarseCoin.sol";


contract apuntarse {

    //Requerimos que el contrato este desbloqueado para apuntarse
    bool lock = false;
    address private trash;
    uint8 n_participantes;

    address public owner;
    apuntarseCoin public coin;
    
    //Información sobre los participantes del CTF
    struct playerInfo {
        bytes32 nick;
        address add;
        uint8 numero;
    }

    mapping(address => bool) participantes;
    mapping(address => playerInfo) register;
    
    constructor (apuntarseCoin _coin) public {
        participantes[msg.sender] = false;
        owner = msg.sender;
        coin = _coin;
        coin.mint();
    }

    function apuntarseCTF(bytes32 _name, address _add, uint8 _numero) public {
        
        playerInfo information;
        information.nick = _name;
        information.add = _add;

        uint8 aux = _numero + 1;
        require(_numero > 0, "Tu numero no puede ser negativo");
        require(aux == 0, "El numero de equipo sigue sin ser valido, intentalo de nuevo");

        require(lock, "El contrato se debe encontrar desbloqueado para poder apuntarse");

        participantes[msg.sender] = true;

        lock = false;
    }

    function desapuntarse() external {
        require(participantes[msg.sender], "No te encuentras apuntado al CTF");
        participantes[msg.sender] = false;
    }

    function apuntado() external view returns (bool) {
        return participantes[msg.sender];
    }

    function getLocked() external view returns (bool) {
        return lock;
    }

    function getCoins() external view returns (uint256) {
        return coin.balanceOf(msg.sender);
    }

    function getContractCoins() external view returns (uint256) {
        return coin.balanceOf(address(this));
    }

    function contractTransfer() public {
        require(participantes[msg.sender], "No te encuentras apuntado en el taller");
        coin.sendCoin(msg.sender, 1);
    }
}