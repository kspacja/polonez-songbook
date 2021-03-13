import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { theme } from './_themes';
import GlobalStyles from './_globalStyles';

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState(theme);

  useEffect(() => {
    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!isDark) {
      setMode(theme);
    }
  }, []);

  return (
    <ThemeProvider theme={mode}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
