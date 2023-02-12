const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const provider = new HDWalletProvider("attract guide large mandate ketchup hub awake elder zoo dignity color sort", "https://goerli.infura.io/v3/708c5de2e3ba4c1181691cd1d765d60e", 0)
const web3 = new Web3(provider);

async function main() {

    const signer = await web3.eth.getAccounts();
    console.log(provider);
    console.log(signer[0]);

}

main();