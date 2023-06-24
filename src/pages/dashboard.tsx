import styles from '@/styles/Dashboard.module.scss';

import { Navbar } from "@/components/Navbar";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createLottery, createTracker, getOrCreateUser, deposit, selectWinner } from '@/lib/contractInteraction';

export default function Dashboard() {
  const anchorWallet = useAnchorWallet();
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.buttons}>

          <button onClick={() => {
            if (!anchorWallet) return;
            createTracker(anchorWallet);
          }}>Create Tracker</button>

          <button onClick={() => {
            if (!anchorWallet) return;
            createLottery(anchorWallet);
          }}>Create Lottery</button>

          <button onClick={() => {
            if (!anchorWallet) return;
            getOrCreateUser(anchorWallet);
          }}>Create User</button>

          <button onClick={() => {
            if (!anchorWallet) return;
            deposit(anchorWallet, 1);
          }}>Deposit</button>

          <button onClick={() => {
            if (!anchorWallet) return;
            selectWinner(anchorWallet);
          }}>Select Winner</button>

          <button>Withdraw</button>

        </div>
      </div>
    </div>
  );
}