import { useState, useEffect } from 'react';
import NextImage from 'next/Image';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { theme } from './_themes';
import GlobalStyles from './_globalStyles';
import { Header, Image, HeaderText } from './styles';

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
      <Header>
        <Image>
          <NextImage
            src={`/images/logo.png`}
            layout="fill"
            alt="Logo: Polonez"
            title="Polonez"
            objectFit="cover"
            objectPosition="left top"
          />
        </Image>
        <HeaderText>polonez-songbook.pl</HeaderText>
      </Header>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
