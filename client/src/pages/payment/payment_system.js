import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import payment_styles from '@/styles/payment/Payment.module.css'
import { load, payFlagApuntarse, payFlagCasino } from '../../functions/functions';
import React, { useState } from 'react';

import Link from 'next/link';

export default function paymentButtons() {
    const [refresh, setRefresh] = useState(true);

    const payFlag1 = async () => {

    const { address } = await load();
   
    console.log('Transaction pay flag apuntarse from:', address);
    let hash_flag_1 = await payFlagApuntarse( {from: address });

    const response = await fetch("http://127.0.0.1:5000/flags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ string: hash_flag_1 })
    });

    const result = await response.json();
    const storedString = result.result;
    console.log(storedString); 

    setRefresh(true);
  };

  const payFlag2 = async () => {

    const { address } = await load();

    console.log('Transaction pay flag apuntarse from:', address);
    let hash_flag_2 = await payFlagCasino( {from: address });
    
    const response = await fetch("http://127.0.0.1:5000/flags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ string: hash_flag_2 })
    });

    const result = await response.json();
    const storedString = result.result;
    console.log(storedString); 

    setRefresh(true);
  };


  return (
    <>
      <Head>
        <title>CTF HackOn Payment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={payment_styles.main}>
        <ul className={styles.nav}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/payment/payment_system">Payment</Link></li>
          <li><Link href="/code/apuntarseCode">Contrac Apuntarse</Link></li>
          <li><Link href="/code/casinoCode">Contract Casino</Link></li>
          <li><Link href="/documentation/truffle-doc">Truffle Help</Link></li>
          <li><Link href="/documentation/truffle-doc">Truffle Help</Link></li>


        </ul>
        <div>
          <h1>HackOn PayFlags</h1>
          <div>Paga aqui las flags con las monedas devueltas de los retos!</div>
        </div>

        <div className={payment_styles.mainBox}>
          <button className={payment_styles.button} onClick={payFlag1}>Pay "Apuntarse" Flag</button>
          <button className={payment_styles.button} onClick = {payFlag2}>Pay "Casino" Flag</button>
        </div>
      </main>
    </>
  )
}