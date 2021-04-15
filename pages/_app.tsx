import { useState, useEffect } from 'react';
import NextImage from 'next/Image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Link from 'components/Link';

import { ThemeProvider } from 'styled-components';

import { theme } from './_themes';
import GlobalStyles from './_globalStyles';
import { Header, Image, HeaderText, Navigation } from './styles';

const PageLoading = dynamic(() => import('components/PageLoading'), {
  ssr: false,
});

const mainNavigation = [
  { text: 'Strzały w 10', url: '/hits' },
  { text: 'O projekcie', url: '/about' },
];

function MyApp({ Component, pageProps }) {
  const { isFallback, isReady } = useRouter();
  const [mode, setMode] = useState(theme);

  const isLoading = isFallback || !isReady;

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
      <Navigation>
        {mainNavigation.map(({ text, url }) => (
          <li key={url}>
            <Link href={url}>{text}</Link>
          </li>
        ))}
      </Navigation>
      {isLoading ? <PageLoading /> : <Component {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
