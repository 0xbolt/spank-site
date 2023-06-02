import Link from 'next/link';
import styles from '@/styles/Navbar.module.scss';

import { useWallet } from '@solana/wallet-adapter-react';
import { ConnectWallet } from './Wallet';

export const Navbar = () => {
  const { publicKey } = useWallet();
  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <img className={styles.logo} src="/logo.png" alt="Logo" />
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/airdrop">Airdrop</Link>
        </div>
        <div className={styles.connectBtnDiv}>
          <ConnectWallet noFullSize={true}>
            {publicKey ? (
              <p className={styles.connectedBtn}>Wallet Connected</p>
            ) : (
              <p className={styles.connectBtn}>Connect Wallet</p>
            )}
          </ConnectWallet>
        </div>
      </div>
    </div>
  );
};
