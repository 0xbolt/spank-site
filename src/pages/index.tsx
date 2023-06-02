/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Home.module.scss";

import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <SplashScreen>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.logoImg}>
            <img
              src="/logo.png"
              alt="Next.js Logo"
              width="100%"
              height="100%"
            />
          </div>

          <div className={styles.flexCenter}>
            <div className={styles.textSvg}>
              <img
                src="/spanking_text.svg"
                width="100%"
                height="100%"
                alt="Text"
                style={{ minWidth: "100%", minHeight: "100%" }}
              />
            </div>
            <p className={styles.subHeading}>
              Let&apos;s spank the villains of crypto!
            </p>
          </div>

          <div className={styles.buttons}>
            <a href="https://twitter.com/spankcoin" target="_blank">
              <button>Twitter</button>
            </a>

            <a href="https://t.me/SpankCoinOfficial" target="_blank">
              <button>Telegram</button>
            </a>
          </div>
        </div>
      </main>
    </SplashScreen>
  );
}
