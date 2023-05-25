import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="Next.js Logo"
            width={200}
            height={200}
            priority
          />
        </div>

        <div className={styles.flexCenter}>
        <Image src="/spanking_text.svg" width="700" height="100" alt="Text" />
        <p className={styles.subHeading}>Let's spank the villians of crypto!</p>
        </div>

        <div className={styles.buttons}>
          <a href="https://twitter.com/spankcoin" target="_blank">
            <button>Twitter</button>
          </a>

          <a href="https://twitter.com/spankcoin" target="_blank">
            <button>Telegram</button>
          </a>
        </div>
      </main>
    </>
  )
}
