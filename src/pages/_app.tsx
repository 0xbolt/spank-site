import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { DefaultHead } from '@/components/DefaultHead'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultHead />
      <Component {...pageProps} />
    </>
  )
};
