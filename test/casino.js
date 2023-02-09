const casino_contract = artifacts.require("../contracts/CTF/casino.sol");
const casino_coin = artifacts.require("../contracts/tokens/casinoCoin.sol");
const casino_payment = artifacts.require("../contracts/payment/casinoPayment.sol");

contract('casino', () => {

    let casino;

    it ('Test Coins', async() => {

        casino = await casino_contract.deployed();
        console.log(casino.address);
        await casino.apuntarse();

        let contract_token_balance = (await casino.getContractCoins()).toNumber();
        console.log(contract_token_balance);

        let user_token_balance = (await casino.getCoins()).toNumber();
        console.log(user_token_balance); 

    })

    it ('Test Ruleta', async() => {

        casino = await casino_contract.deployed();
        await casino.apuntarse();

        let win = await casino.roulette(10, 10);
        console.log(win);
        win = await casino.roulette(10, 10);
        console.log(win);
        
        let funds = (await casino.getFunds()).toNumber();
        console.log(funds);
    
    })

    it ('Test Dados', async() => {
        
        casino = await casino_contract.deployed();
        await casino.apuntarse();

        let win = await casino.dice(3, 10);
        console.log(win);
        win = await casino.dice(4, 10);
        console.log(win);
        
        let funds = (await casino.getFunds()).toNumber();
        console.log(funds);


    })

    it ('Test Loteria', async() => {

        casino = await casino_contract.deployed();
        await casino.apuntarse();

        let payload = "0x5304e3777d25c9f43b9dc5c8ebb5f2d7f80da15e74e48810f2965c6636b2fee2";
        await casino.lotto(payload);
        await casino.lotto(payload);
        await casino.lotto(payload);
        await casino.lotto(payload);

        let winner = casino.lotto_validator();
        console.log(winner);

        let coins = (await casino.getCoins()).toNumber();
        console.log(coins);

    })

    it ('Test Funds', async() => {

        casino = await casino_contract.deployed();
        await casino.apuntarse();

        await casino.addFunds();
        await casino.addFunds();

        let winner = casino.retrieveFundsValidator(10);
        console.log(winner);

    })

    it ('Test Result', async() => {

        casino = await casino_contract.deployed();

        let coins = (await casino.getCoins()).toNumber();
        console.log(coins);

    })

    it ('Test casino payment system', async() => {
        casinoPayment = await casino_payment.deployed();
        console.log(casinoPayment.address);
        
        await casinoPayment.pay_flag();
        const hash = await casinoPayment.getFlagHash();
        console.log(hash.toString());

        let expected_hash = "234u78o97867564q32ewqdesfthy7ui6867";

        if (hash.toString() == expected_hash) {
            console.log(true);
        }else{
            console.log(false);
        }

    });
});