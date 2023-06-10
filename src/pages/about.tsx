import styles from "@/styles/About.module.scss";
import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.title}>About</h1>
        <div className={styles.content}>
          <p>
            {`
            It's been a turbulent ride in the crypto-verse the last few years. Bad actors have been raining on our parade, turning what should've been a tech revolution into a nightmare on crypto street. But fear not - we're about to even the score with $SPANK.
          `}
          </p>
          <p>
            {`
            $SPANK is your fun-filled ticket to serving justice. Just one $SPANK token, and you can deliver a dignity-stripping spank to the rear of crypto's biggest villains, starting with our dear friend, Gary.
          `}
          </p>
          <p>
            {`
            But wait, there's more. With each spank, you score a spot in our lottery pool - the entirety distributed to several lucky spankers.
          `}
          </p>
          <p>
            {`
            Ready to join the $SPANK revolution and leave a mark (or a spank) on the crypto world? Let's get spanking!
          `}
          </p>
          <p>
            {`
            Why the big bad Gary? Because he has unscrupulously abused his powers, shuttered down an entire industry without providing the clarity or framework it needs. This puts him at numero Uno on our spank list.
          `}
          </p>
          <p>
            {`
            Why Solana? Because it's the only L1 where Gary can be spanked at 50,000 spanks per second. And at super low costs. We believe our spankers shouldn't have to spend $100+ dollars to commit this noble deed.
          `}
          </p>
          <p>{"$SPANK is for everybody."}</p>
        </div>
      </div>
    </div>
  );
}