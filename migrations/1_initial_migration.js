const apuntarse = artifacts.require("apuntarse");
const coinApuntarse = artifacts.require("apuntarseCoin");

const casino = artifacts.require("casino");
const coinCasino = artifacts.require("casinoCoin");

const paymentApuntarse = artifacts.require("apuntarsePayment");
const paymentCasino = artifacts.require("casinoPayment");

module.exports = async function (deployer) {

  await deployer.deploy(coinApuntarse);
  console.log("Coin 'coinApuntarse' address: ", coinApuntarse.address);

  await deployer.deploy(apuntarse, coinApuntarse.address);
  console.log("Contract 'apuntarse' address: ", apuntarse.address);

  await deployer.deploy(coinCasino);
  console.log("Coin 'casinoCoin' address: ", coinCasino.address);

  await deployer.deploy(casino, coinCasino.address);
  console.log("Contract 'casino' address: ", casino.address);

  await deployer.deploy(paymentApuntarse, coinApuntarse.address);
  console.log("Payment contract 'apuntarse' address: ", paymentApuntarse.address);

  await deployer.deploy(paymentCasino, coinCasino.address);
  console.log("Payment contract 'casino' address: ", paymentCasino.address);
  
};