import styles from '@/styles/Dashboard.module.scss';

import { Navbar } from "@/components/Navbar";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createUser } from '@/lib/contractInteraction';

export default function Dashboard() {
  const anchorWallet = useAnchorWallet();
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.buttons}>
          <button>Create Tracker</button>
          <button>Create Lottery</button>

          <button onClick={() => {
            if (!anchorWallet) return;
            createUser(anchorWallet);
          }}>Create User</button>

          <button>Deposit</button>
          <button>Select Winner</button>
          <button>Withdraw</button>
        </div>
      </div>
    </div>
  );
}