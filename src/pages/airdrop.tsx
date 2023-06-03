import wlList from "@/lib/wl.json";
import styles from "@/styles/Airdrop.module.scss";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWallet } from "@/components/Wallet";

const tweets: string[] = [
  "Hey @SpankCoin, I just told my dog we could buy unlimited treats if we got your Airdrop. Don't disappoint a puppy, will ya? #WhitelistMeSpankCoin",
  "Just tried to bribe my computer to get me on @SpankCoin Airdrop. It said 'insufficient biscuits' #WhitelistMeSpankCoin",
  "Shoutout to @SpankCoin for keeping me up at night. Can't sleep, might miss the Airdrop. Officially requesting an entry pass to dreamland #WhitelistMeSpankCoin",
  "Doctor said I needed more vitamin A(ir) D(rop) from @SpankCoin. Please don't let me get scurvy #WhitelistMeSpankCoin",
  "Did you know? When you whitelist me for your Airdrop, a unicorn gets its wings. Don't be a unicorn hater, @SpankCoin #WhitelistMeSpankCoin",
  "Knock knock. Who's there? Not me, still waiting for that @SpankCoin Airdrop invite. #WhitelistMeSpankCoin",
  "Do I get free delivery with that Airdrop, @SpankCoin? Asking for a friend (and by friend, I mean me). #WhitelistMeSpankCoin",
  "Hey @SpankCoin, if you whitelist me for your Airdrop, I promise to stop telling blockchain jokes at parties. #WhitelistMeSpankCoin",
  "Spotted an unidentified flying object. Oh wait, that's just the @SpankCoin Airdrop without me. 😢 #WhitelistMeSpankCoin",
  "If getting whitelisted for the @SpankCoin Airdrop was a sport, I'd be an Olympic gold medalist 🏅#WhitelistMeSpankCoin",
  "Does @SpankCoin's Airdrop come with a parachute? Asking for safety reasons. #WhitelistMeSpankCoin",
  "My fortune cookie said, 'You will be whitelisted for the @SpankCoin Airdrop.' Don't make my cookie a liar 🥠 #WhitelistMeSpankCoin",
  "Why did the chicken cross the road? To get whitelisted for the @SpankCoin Airdrop, obviously 🐔 #WhitelistMeSpankCoin",
  "Considering starting a band called 'Waiting for @SpankCoin Airdrop.' Our first song? 'Whitelist Blues.' 🎸#WhitelistMeSpankCoin",
  "Trying to crack the code for @SpankCoin Airdrop whitelist. I suspect the password is 'pretty please with a cherry on top.' 🍒#WhitelistMeSpankCoin",
  "Lost: One @SpankCoin Airdrop whitelist invitation. If found, please return to me. Reward offered! 🏷️#WhitelistMeSpankCoin",
  "Just had a dream where I was whitelisted for @SpankCoin's Airdrop. Woke up to reality. 😭#WhitelistMeSpankCoin",
  "I heard @SpankCoin Airdrop is so exclusive, even James Bond couldn't get on the list. But, I'm ready to accept the mission! 🕵️‍♂️ #WhitelistMeSpankCoin",
  "Will trade my legendary dad jokes for a spot on @SpankCoin's Airdrop whitelist. Fair deal, right? 🤝 #WhitelistMeSpankCoin",
  "Does wishing upon a star work for getting on @SpankCoin Airdrop whitelist? Asking for... me. ✨#WhitelistMeSpankCoin"
];

function getRandomTweet(): string {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  return tweets[randomIndex];
}

function tweetRandomRequest() {
  const tweet = getRandomTweet();
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  window.open(url, "_blank");
}

export default function Airdrop() {
  const { width, height } = useWindowSize();
  const { publicKey } = useWallet();
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>(
    "Let's check whether you're eligible for the airdrop!"
  );
  function checkEligibility() {
    if (!publicKey) return;
    const isWLed = wlList.publicKeys.includes(publicKey.toBase58());
    setIsEligible(isWLed);
    if (isWLed)
      setMessage(
        "Congrats! You're eligible for the exclusive airdrop, please follow us on Twitter to stay updated on the claiming process 🎉"
      );
    else
      setMessage(
        "Uh-oh, you're not yet eligible for the airdrop, please check back later 🥺"
      );
  }

  return (
    <div>
      {isEligible && <Confetti width={width} height={height} />}
      <Navbar />
      <div>
        <div className={styles.content}>
          <h1 className={styles.message}>{message}</h1>
          {isEligible === null && (
            <div className={styles.buttons}>
              <ConnectWallet noFullSize={true} noToast={true}>
                <button onClick={checkEligibility}>Check Eligibility</button>
              </ConnectWallet>
            </div>
          )}
          {isEligible && (
            <div className={styles.buttons}>
              <button onClick={() => {
                window.open("https://twitter.com/spankcoin", "_blank")
              }} style={{ padding: "0.5% 2rem"}}>Follow us on Twitter</button>
            </div>
          )}
          {isEligible === false && (
            <div className={styles.buttons}>
              <button onClick={tweetRandomRequest}>Request Whitelist</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}