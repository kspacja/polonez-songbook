export const theme = {
  font: '#555',
  fontInvert: '#FFFFFF',
  bg: '#FFFFFF',
  card: '#FFFFFF',
  border: '#ccc',
  details: '#EB5057',
  outline: '#62B5D9',
  button: {
    idle: '#efefef',
    hover: '#dfdfdf',
  },
  icons: '#000',
  textBg: 'rgba(255, 255, 255, 0.9)',
  focused: 'rgba(255, 240, 240, 1)',
  shadow: 'rgba(0, 0, 0, 0.2)',
};

export const darkTheme = {
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

export type Theme = typeof theme;
