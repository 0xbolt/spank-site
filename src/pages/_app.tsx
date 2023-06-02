import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { DefaultHead } from "@/components/DefaultHead";
import { Wallet } from "@/components/Wallet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wallet>
      <DefaultHead />
      <Component {...pageProps} />
    </Wallet>
  );
}