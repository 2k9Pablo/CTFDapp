import casinoPayment from '../contracts/casinoPayment.json';
import apuntarsePayment from '../contracts/apuntarsePayment.json';
import Web3 from 'web3';

const contract = require('@truffle/contract');

import { apuntarsePaymentAddress, casinoPaymentAddress } from '../contracts/constants';

const load = async () => {

    const provider = await loadWeb3();
    const account = await loadAccount();
    return { provider, account };
}

const loadWeb3 = async () => {

    
    const prov = window.ethereum;

    if (prov != 'undefined') {
        const web3 = new Web3(prov);
        console.log('Metamask instalado!');
    
    } else {
        console.log('Porfavor instala metamask');
    }

    return web3.eth.givenProvider;
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getAccounts();
    const currentAccount = addressAccount[0];
    return currentAccount;
};

const payFlagApuntarse = async () => {

    const { provider, account } = await load();
    const theApuntarsePayment = contract(apuntarsePayment, apuntarsePaymentAddress);
    theApuntarsePayment.setProvider(provider);

    const apuntarsePaymentContract = await theApuntarsePayment.deployed();

    await apuntarsePaymentContract.pay_flag();
    const response = await apuntarsePaymentContract.getFlagHash();
    console.log(response.toString());
}

const payFlagCasino = async () => {

    const { provider, account } = await load();
    const theCasinoPayment = contract(casinoPayment, casinoPaymentAddress);

    const casinoPaymentContract = await theCasinoPayment.deployed();

    await casinoPaymentContract.pay_flag();
    const response = await casinoPaymentContract.getFlagHash();
    console.log(response.toString());
}