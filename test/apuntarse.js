const apuntarse_contract = artifacts.require("../contracts/CTF/apuntarse.sol");
const apuntarse_coin = artifacts.require("../contracts/tokens/apuntarseCoin.sol");
const apuntarse_payment = artifacts.require("../contracts/payment/apuntarsePayment.sol");

contract('apuntarse', () => {

  let apuntarse;

  //Funcion para probar el token del contrato
  it ('Test Coins', async() => {
    
    //Definimos apuntarse como el contrato
    apuntarse = await apuntarse_contract.deployed();
  
    //Imprimimos la direccion en la que se encuentra deployed
    console.log(apuntarse.address);

    //Llamamos a la funcion getContractCoins para comprobar el balance del contrato y lo imprimimos
    let balance = (await apuntarse.getContractCoins()).toNumber();
    console.log(balance);
    
    //Llamamos a la funcion getTokens para comprobar el balance del usuario y lo imprimimos
    let user_token_balance = (await apuntarse.getCoins()).toNumber();
    console.log(user_token_balance);

  })

  it ('Test CTF Function', async() => {

    apuntarse = await apuntarse_contract.deployed();
    console.log(apuntarse.address);

    let payload = "0x0000000000000000000000000000000000000000000000000000000000000001";
    let add = "0xf4EEbcb9B94087e1Fe05d97789B9771F6EC5337B";
    let number = 255;

    let locked = await apuntarse.getLocked();
    console.log(locked);

    await apuntarse.apuntarseCTF(payload, add, number);

    let apuntado = await apuntarse.apuntado();
    console.log(apuntado);

    await apuntarse.contractTransfer();
    
    let user_token_balance = (await apuntarse.getCoins()).toNumber();
    console.log(user_token_balance);

  })
  it ('Test apuntarse payment system', async() =>{
    //Devolver el string, printearlo y ver que coincide con el hash que se como medio from
    //y parece que no sea el mismo hash
    payment = await apuntarse_payment.deployed();
    console.log(payment.address);

    await payment.pay_flag();
    const response = await payment.getFlagHash();
    let hash = "4567890p098765456a78s9fsijhgbsf";
    console.log(response.toString());

    if (response.toString() == hash){
      console.log(true); 
    }
    
    else{
      console.log(false);
    }

  });
});
