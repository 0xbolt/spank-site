import styles from '@/styles/Dashboard.module.scss';
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className={styles.main}>

      </div>
    </div>
  );
}