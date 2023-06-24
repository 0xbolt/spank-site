/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Home.module.scss";
import Image from "next/image";

import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

// icons
import minus from '@/images/minus.svg';
import plus from '@/images/plus.svg';
import { useEffect, useState } from "react";
import { getTrackerAccountData, getOrCreateUser, deposit } from "@/lib/contractInteraction";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { ConnectWallet } from "@/components/Wallet";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const wallet = useAnchorWallet();
  const [times, setTimes] = useState(1);
  const [deposited, setDeposited] = useState(false);
  const [totalSpanks, setTotalSpanks] = useState(0);

  function handleChange(plus: boolean) {
    if (plus) {
      setTimes(times + 1);
    } else {
      if (times > 1) {
        setTimes(times - 1);
      }
    }
  }

  async function handleSpank() {
    try {
      if (!wallet) return;
      const userAccount = await getOrCreateUser(wallet);
      await deposit(wallet, times * 100_000);
      setDeposited(true);
      console.log('Play the video now');
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async function () {
      const trackerAccount = await getTrackerAccountData();
      setTotalSpanks(trackerAccount?.totalSpanks);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.contentChild}>
          <h1>{"Spank G#ry"}</h1>
          <p className={styles.description}>{"A portion of the tokens you spend here gets burned, the rest gets deposited in a lottery pool which gets distributed back to the commmunity"}</p>
          <div className={styles.timesParent}>
            <Image onClick={() => handleChange(false)} className={styles.timesIcons} src={minus} alt="minus" />
            <p className={styles.times}>{times}</p>
            <Image onClick={() => handleChange(true)} className={styles.timesIcons} src={plus} alt="plus" />
            <p className={styles.cost}>{"= " + (times * 100) + "K"}</p>
          </div>
          <ConnectWallet noToast={true}>
            <button onClick={handleSpank} className={styles.spankButton}>{"SPANK"}</button>
          </ConnectWallet>
          <p className={styles.timesSpanked}>{"Times Spanked: " + totalSpanks}</p>
        </div>
        <div className={styles.video}>
          <video loop autoPlay={false} onEnded={() => setDeposited(false)}>
            <source src="/spank.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}