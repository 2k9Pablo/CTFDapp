import casinoPayment from '../contracts/casinoPayment.json';
import apuntarsePayment from '../contracts/apuntarsePayment.json';
import Web3 from 'web3';

const contract = require('@truffle/contract');

import { apuntarsePaymentAddress, casinoPaymentAddress } from '../contracts/constants';

export const load = async () => {

    const provider = await loadWeb3();
    const address = await loadAccount();
    const { payment_system_apuntarse, paymen_system_casino } = await loadContracts();

    return { address, provider, payment_system_apuntarse, payment_system_casino };

}   

const loadWeb3 = async () => {

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const web3 = window.web3;

    return web3.currentProvider;
};

const loadAccount = async () => {

    const addressAccount = await web3.eth.getAccounts();
    const currentAccount = addressAccount[0];
    return currentAccount;
};

const loadContracts = async () => {
    const { provider, account } = await load();

    const theApuntarsePayment = contract(apuntarsePayment);
    theApuntarsePayment.setProvider(provider);
    const payment_system_apuntarse = await theApuntarsePayment.deployed();

    const theCasinoPayment = contract(casinoPayment);
    theCasinoPayment.setProvider(provider);
    const paymen_system_casino = await theCasinoPayment.deployed();

    return { payment_system_apuntarse, paymen_system_casino };
}

export const payFlagApuntarse = async () => {
    const { payment_system_apuntarse } = await loadContracts();

    await payment_system_apuntarse.pay_flag();
    const hash = await payment_system_apuntarse.getFlagHash();

    console.log(hash.toString());

}

const payFlagCasino = async () => {
    const { paymen_system_casino } = await loadContracts();

    await paymen_system_casino.pay_flag();
    const hash = await payment_system_casino.getFlagHash();
    console.log(hash);

}