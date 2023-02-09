import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { load, payFlagApuntarse } from '../functions/functions';
import React, { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [address, setAdress] = useState(null);
  const [payment_apuntarse, setPayment_apuntarse] = useState(null);
  const [payment_casino, setPayment_casino] = useState(null);
  const [provider, setProvider] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const payFlag1 = async () => {
    payFlagApuntarse();
    setRefresh(true);
  };

  const payFlag2 = async () => {
    await payment_casino.pay_flag( {from: addressAccount} );
    let hash = payment_casino.getFlag({from: addressAccount});
    setRefresh(true);
    console.log(hash.toString());
  };

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAdress(e.address);
      setProvider(e.provider);
      setPayment_apuntarse(e.payment_system_apuntarse);
      setPayment_casino(e.payment_system_casino);
    });
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="main-box">
          <button onClick={payFlag1} className="button1">First</button>
          <button className="button2">Second</button>
        </div>
      </main>
    </>
  )
}
