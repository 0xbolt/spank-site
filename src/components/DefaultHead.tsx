import Head from "next/head";

function DefaultHead() {
  return (
    <Head>
      <title>SpankCoin</title>
      <meta name="description" content="Let's spank the villains of crypto" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  );
}

export { DefaultHead };