import styles from '@/styles/Winners.module.scss';
import { Navbar } from '@/components/Navbar';

export default function Winners() {
  return (
    <div>
      <Navbar />
      <h1 className={styles.comingSoon}>{"Coming Soon!"}</h1>
    </div>
  );
}