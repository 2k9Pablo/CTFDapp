import casinoPayment from '../contracts/casinoPayment.json';
import apuntarsePayment from '../contracts/apuntarsePayment.json';
import Web3 from 'web3';

const contract = require('@truffle/contract');

import { apuntarsePaymentAddress, casinoPaymentAddress } from '../contracts/constants';

export const load = async () => {

    //console.log("1");
    const provider = await loadWeb3();
    //console.log(provider);
    const address = await loadAccount();
    //console.log(address);
    const { payment_system_apuntarse, payment_system_casino } = await loadContracts();

    return { address, provider, payment_system_apuntarse, payment_system_casino };

}   

export const loadGeneralInformation = async () => {
    const provider = await loadWeb3();
    //console.log(provider);
    const address = await loadAccount();

    return {provider, address};
}

export const loadWeb3 = async () => {

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const web3 = new Web3(window.web3);

    return web3.currentProvider;
};

const loadAccount = async () => {

    const addressAccount = await web3.eth.getAccounts();
    const currentAccount = addressAccount[0];
    return currentAccount;
};

const loadContracts = async () => {
    const {provider, address} = await loadGeneralInformation();
    
    const theApuntarsePayment = contract(apuntarsePayment);
    theApuntarsePayment.setProvider(provider);
    const payment_system_apuntarse = await theApuntarsePayment.deployed();

    const theCasinoPayment = contract(casinoPayment);
    theCasinoPayment.setProvider(provider);
    const payment_system_casino = await theCasinoPayment.deployed();

    return { payment_system_apuntarse, payment_system_casino };
}

export const payFlagApuntarse = async () => {
    const { payment_system_apuntarse } = await loadContracts();
    const { provider, address } = await loadGeneralInformation();

    await payment_system_apuntarse.pay_flag( {from: address });
    const hash = await payment_system_apuntarse.getFlagHash();

    return hash.toString();
}

export const payFlagCasino = async () => {
    const { payment_system_casino } = await loadContracts();
    const { provider, address } = await loadGeneralInformation();

    await payment_system_casino.pay_flag( {from: address } );
    const hash = await payment_system_casino.getFlagHash();
    return hash.toString();
}