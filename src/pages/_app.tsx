/* eslint-disable import/no-extraneous-dependencies */
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
