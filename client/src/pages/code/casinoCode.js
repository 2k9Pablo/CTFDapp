import styles from '@/styles/Home.module.css'
import Link from 'next/link';


export default function codeCasino () {
    return (
        <main className={styles.main}>
            <ul className={styles.nav}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/payment/payment_system">Payment</Link></li>
            <li><Link href="/code/apuntarseCode">Contrac Apuntarse</Link></li>
            <li><Link href="/documentation/truffle-doc">Truffle Help</Link></li>
            </ul>
            <pre>
                <code>
                {`
                    //SPDX-License-Identifier: AFL-3.0

                    pragma solidity ^0.8.13;
                    
                    import "../tokens/casinoCoin.sol";
                    
                    contract casino {
                    
                        address public owner;
                        casinoCoin public coin;
                        bytes32 public seed;
                        mapping(address => bool) participantes;
                        mapping(address => uint256) consecutive_wins;
                        mapping(address => uint256) funds;
                    
                        constructor(casinoCoin _coin) {
                            owner = msg.sender;
                            participantes[msg.sender] = true;
                            seed = "Pseudo_are_safu";
                            
                            coin = _coin;
                            coin.mint();
                            
                        }
                    
                        function roulette(uint8 x, uint256 bet) public returns (bool) {
                            
                            uint256 random;
                            random = uint256(keccak256(abi.encodePacked(block.timestamp)));
                            if (random == x){
                                funds[msg.sender] += bet * 35;
                                return true;
                            }
                            return false;
                            
                        }
                    
                        function dice(uint8 x, uint256 bet) public returns (bool) {
                    
                            uint256 random;
                            random = uint256(keccak256(abi.encodePacked(block.timestamp))) % 6;
                    
                            require(x < 7, "Los dados solo tienen 6 numeros");
                            if (random == x){
                                funds[msg.sender] += bet * 6;    
                                return true;
                            }
                            return false;
                    
                            
                        }
                        
                        function lotto(uint256 _guess) public {
                            uint256 num = uint256(keccak256(abi.encodePacked("Pseudo_are_safu")));
                            if (_guess == num) {
                                consecutive_wins[msg.sender] = consecutive_wins[msg.sender] + 1;
                            }else {
                                consecutive_wins[msg.sender] = 0;
                            }
                            
                        }
                    
                        function lotto_validator() public returns (bool) {
                            require(consecutive_wins[msg.sender] > 1, "No has ganado las suficientes partidas");
                            require(participantes[msg.sender], "No estas registrado");
                    
                            coin.sendCoin(msg.sender, 1);
                            return true;
                        }
                                
                        function addFunds() public {
                            funds[msg.sender] += 100;
                        }
                    
                    
                        function retrieveFundsValidator(uint256 _funds) external returns (bool){
                    
                            require((funds[msg.sender] -= _funds) >= 0, "No tienes suficientes fondos");
                            require(msg.sender != address(this), "2");
                            this.retrieveFunds(_funds);
                            return true;
                        
                        }
                    
                        function retrieveFunds(uint256 _funds) external returns (bool){
                            
                            require((funds[tx.origin] -= _funds) >= 0, "No tienes suficientes fondos");
                            funds[tx.origin] -= _funds;
                            
                            require(msg.sender == address(this), "No la retirada solo es autorizada por el casino");
                    
                            coin.sendCoin(tx.origin, 1);
                            return true;
                        }
                    
                        function getConsecutiveWins() external view returns (uint256) {
                            
                            uint256 aux = consecutive_wins[msg.sender];
                            return aux;
                        }
                        
                        function getContractCoins() external view returns (uint256) {
                            return coin.balanceOf(address(this));
                        }
                    
                        function getCoins() external view returns (uint256) {
                            return coin.balanceOf(msg.sender);
                        }
                    
                        function getFunds() external view returns (uint256) {
                            return funds[msg.sender];
                        }
                    
                        function apuntarse() public {
                            participantes[msg.sender] = true;
                        }
                    }
                `}
            </code>
        </pre>
    </main>
    )
}