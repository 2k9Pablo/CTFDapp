const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const provider = new HDWalletProvider("attract guide large mandate ketchup hub awake elder zoo dignity color sort", "https://goerli.infura.io/v3/708c5de2e3ba4c1181691cd1d765d60e", 0)
const web3 = new Web3(provider);

const contractApuntarseCoin = new web3.eth.Contract(apuntarseCoinABI, "0x4C334CeFf2ecEC1fc7ceFd4a48A9AC534249ffC6");
const contractCasinoCoin = new web3.eth.Contract(casinoCoinABI, "0xe9F1680fF7b7Bf3B306b5B470175E3744Fd3d833");

async function getCoins() {
    
    const signer = await web3.eth.getAccounts();

    await contractApuntarseCoin.methods.mint().send({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    const apuntarseCoins = await contractApuntarseCoin.methods.balanceOf(signer[0]).call( {from: signer[0], gas: 4500000, gasPrice:10000000000 });
    console.log(apuntarseCoins);

    await contractCasinoCoin.methods.mint().send({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    const casinoCoins = await contractCasinoCoin.methods.balanceOf(signer[0]).call( {from: signer[0], gas: 4500000, gasPrice:10000000000 });
    console.log(casinoCoins);

}

getCoins();