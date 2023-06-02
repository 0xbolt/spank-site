import styles from '@/styles/Airdrop.module.scss';

import { DefaultHead } from '@/components/DefaultHead';
import { Navbar } from '@/components/Navbar';
import { SplashScreen } from '@/components/SplashScreen';

export default function Airdrop() {
  return (
    <SplashScreen>
      <div>
        <DefaultHead />
        <Navbar />
        <div className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.comingSoon}>Coming Soon!</h1>
          </div>
        </div>
      </div>
    </SplashScreen>
  );
}