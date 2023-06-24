import "@fontsource/inter";
import "@/styles/globals.scss";
import "fontsource-concert-one/latin.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { DefaultHead } from "@/components/DefaultHead";
import { Wallet } from "@/components/Wallet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div style={{ fontSize: "170%", fontFamily: "Inter" }}>
        <Toaster />
      </div>
      <Wallet>
        <DefaultHead />
        <Component {...pageProps} />
      </Wallet>
    </>
  );
}