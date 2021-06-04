/* eslint-disable import/no-extraneous-dependencies */
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';

import 'tailwindcss/tailwind.css';
import { ContextProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
      ;
    </ContextProvider>
  );
}

export default MyApp;
