import { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from './_themes';

export default createGlobalStyle`
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
