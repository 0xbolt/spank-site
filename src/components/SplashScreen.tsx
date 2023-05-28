import React, { useEffect, useState, ReactNode } from 'react';
import styles from '@/styles/Splash.module.scss';

interface SplashScreenProps {
  children: ReactNode;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ children }) => {
  const [playState, setPlayState] = useState(true);
  const [transitionDone, setTransitionDone] = useState(false);

  const videoEndHandler = () => {
    setPlayState(false);
  };

  useEffect(() => {
    const videoElement: HTMLVideoElement | null = document.querySelector("#splash-video");
    if (videoElement) {
      videoElement.onended = videoEndHandler;
    }
  }, []);

  return (
    <div>
      <div
        className={styles.splashScreen}
        style={{ opacity: playState ? 1 : 0, display: transitionDone ? "none" : "" }}
        onTransitionEnd={() => setTransitionDone(true)}
      >
        <video className={styles.splashVideo} id="splash-video" autoPlay muted>
          <source src="/videos/splash.mp4" type="video/mp4" />
        </video>
      </div>
      {children}
    </div>
  );
};

export { SplashScreen };