import type { AppProps } from 'next/app';
import { InstantDbProvider } from '@instantdb/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InstantDbProvider appId="d3271280-bd0f-42c4-a0d3-1bb3125a3c68">
      <Component {...pageProps} />
    </InstantDbProvider>
  );
}

export default MyApp;

