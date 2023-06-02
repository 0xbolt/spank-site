import "fontsource-concert-one/latin.css";
import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { DefaultHead } from "@/components/DefaultHead";
import { Wallet } from "@/components/Wallet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div style={{ fontSize: "170%" }}>
        <Toaster />
      </div>
      <Wallet>
        <DefaultHead />
        <Component {...pageProps} />
      </Wallet>
    </>
  );
}
