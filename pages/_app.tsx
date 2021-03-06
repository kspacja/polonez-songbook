import { useState, useEffect } from 'react';
import Head from 'next/head';

import {
  ThemeProvider,
  createGlobalStyle,
  ThemeProps,
} from 'styled-components';

const theme = {
  font: '#555',
  fontInvert: '#FFFFFF',
  bg: '#FFFFFF',
  card: '#FFFFFF',
  details: '#EB5057',
  outline: '#62B5D9',
  button: {
    idle: '#efefef',
    hover: '#dfdfdf',
  },
  icons: '#000',
  textBg: 'rgba(255, 255, 255, 0.9)',
  focused: 'rgba(255, 240, 240, 1)',
};

const darkTheme = {
  font: '#eeeaea',
  fontInvert: '#FFFFFF',
  bg: '#333333',
  card: '#222222',
  details: '#EB5057',
  icons: '#FFF',
  button: {},
  textBg: 'rgba(0, 0, 0, 0.3)',
  focused: 'rgba(0, 0, 0, 0.8)',
};

type Theme = typeof theme;

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background: ${(props: ThemeProps<Theme>) => props.theme.bg};
    min-height: 100vh;
  }

  body {
    &:after,
    &:before {
      content: '';
      position: fixed;
      left: 0;
      right: 0;
      background: ${(props: ThemeProps<Theme>) => props.theme.details};
    }
    
    &:before {
      height: 0.2em;
      top: 0;
    }
    
    &:after {
      height: 1.5em;
      bottom: 0;
    }
  }

  button,
  html,
  body,
  input,
  textarea {
    padding: 0;
    margin: 0;
    font-family: 'EB Garamond', serif;
    font-weight: 400;
    font-size: 18px;
    color: ${(props: ThemeProps<Theme>) => props.theme.font};
  }
  
  body {
    padding: 0.2em 0 1.5em;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: ${(props: ThemeProps<Theme>) => props.theme.details};
    
    &:hover {
      text-decoration: none;
    }
  }
  
  figure {
    margin: 0;
  }
  
  footer {
    padding: 1em;
  }

  button {
    padding: 0.2em;
    margin: 0;
    border: none;
  }
  
  * {
    box-sizing: border-box;
  }
`;

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
