/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Home.module.scss";
import Image from "next/image";

import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

// icons
import minus from '@/images/minus.svg';
import plus from '@/images/plus.svg';
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [times, setTimes] = useState(1);

  function handleChange(plus: boolean) {
    if (plus) {
      setTimes(times + 1);
    } else {
      if (times > 1) {
        setTimes(times - 1);
      }
    }
  }

  function handleSpank() {

  }

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.contentChild}>
          <h1>{"Spank G#ry"}</h1>
          <p className={styles.description}>{"A portion of the tokens you spend here gets burned, the rest gets deposited in a lottery pool which gets distributed back to the commmunity"}</p>
          <p className={styles.timesQuestion}>{"How many times do you want to spank this m'fer?"}</p>
          <div className={styles.timesParent}>
            <Image onClick={() => handleChange(false)} className={styles.timesIcons} src={minus} alt="minus" />
            <p className={styles.times}>{times}</p>
            <Image onClick={() => handleChange(true)} className={styles.timesIcons} src={plus} alt="plus" />
            <p className={styles.cost}>{"= " + (times * 100) + "K"}</p>
          </div>
          <button onClick={handleSpank} className={styles.spankButton}>{"SPANK"}</button>
          <p className={styles.timesSpanked}>{"Times Spanked: " + "4000"}</p>
        </div>
      </div>
    </main>
  );
}