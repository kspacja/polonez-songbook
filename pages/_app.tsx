import {
  ThemeProvider,
  createGlobalStyle,
  ThemeProps,
} from 'styled-components';

const theme = {
  font: '#323656',
  fontInvert: '#FFF',
  bg: '#323656',
  card: '#E4CECE',
  // #E5959C, #5E5C66, #40BBDA
};

type Theme = typeof theme;

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background: ${(props: ThemeProps<Theme>) => props.theme.bg};
  }


  html,
  body,
  input,
  textarea {
    padding: 0;
    margin: 0;
    font-family: 'Inconsolata', monospace;
    font-weight: 400;
    color: ${(props: ThemeProps<Theme>) => props.theme.font};
  }
  
  body {
    padding: 1em;
  }

  a {
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }
  
  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
