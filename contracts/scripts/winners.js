const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const apuntarsePayment = require("../build/contracts/apuntarsePayment.json").abi;
const casinoPaymentABI = require("../build/contracts/casinoPayment.json").abi;

const provider = new HDWalletProvider("attract guide large mandate ketchup hub awake elder zoo dignity color sort", "https://goerli.infura.io/v3/708c5de2e3ba4c1181691cd1d765d60e", 0)
const web3 = new Web3(provider);

const contractApuntarsePayment = new web3.eth.Contract(apuntarsePayment, "0xD5C665187815378bdf44089b3ec3c3A61eDA130B");
const contractCasinoPayment = new web3.eth.Contract(casinoPaymentABI, "0x22cDB572803AED0E7a73B658368ea29475bA3826"); 

async function getApuntarseSolvers(){

    const winners = contractApuntarsePayment.methods.getWinner().call({from: signer[0], gas: 4500000, gasPrice:10000000000 }).then(addresses => {
        addresses.forEach(address => {
          console.log(address);
        });
      }).catch(error => {
        console.error(error);
    });
}

console.log("CONTRACT APUNTARSE SOLVER ADDRESSES");

getApuntarseSolvers();

async function getCasinoSolvers(){

    const winners = contractApuntarsePayment.methods.getWinner().call({from: signer[0], gas: 4500000, gasPrice:10000000000 }).then(addresses => {
        addresses.forEach(address => {
          console.log(address);
        });
      }).catch(error => {
        console.error(error);
    });
}

console.log("CONTRACT CASINO SOLVER ADDRESSES");

getCasinoSolvers();