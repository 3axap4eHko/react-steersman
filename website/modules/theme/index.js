import shadows from './shadows';

const lightTheme = {
  background: '#fafafa',
  backgroundLight: '#ffffff',
  backgroundDark: '#f5f5f5',
};

const darkTheme = {
  background: '#303030',
  backgroundLight: '#424242',
  backgroundDark: '#212121',
};


const palette = {
  ...darkTheme,

  primaryColor: '#37474f',
  primaryLightColor: '#62727b',
  primaryDarkColor: '#102027',
  primaryTextColor: '#ffffff',

  secondaryColor: '#b71c1c',
  secondaryLightColor: '#f05545',
  secondaryDarkColor: '#7f0000',
  secondaryTextColor: '#ffffff',
};

const xsSize = '600px';
const smSize = '960px';
const mdSize = '1280px';
const lgSize = '1920px';

const screens = {
  xsSize,
  smSize,
  mdSize,
  lgSize,

  xs: `@media (max-width: ${xsSize})`,
  sm: `@media (min-width: ${xsSize}) and (max-width: ${smSize})`,
  md: `@media (min-width: ${smSize}) and (max-width: ${mdSize})`,
  lg: `@media (min-width: ${mdSize}) and (max-width: ${lgSize})`,
  xl: `@media (min-width: ${lgSize})`,

  smUp: `@media (min-width: ${xsSize})`,
  mdUp: `@media (min-width: ${smSize})`,
  lgUp: `@media (min-width: ${mdSize})`,
  xlUp: `@media (min-width: ${lgSize})`,

  xsDown: `@media (max-width: ${xsSize})`,
  smDown: `@media (max-width: ${smSize})`,
  mdDown: `@media (min-width: ${mdSize})`,
  lgDown: `@media (min-width: ${lgSize})`,

};

export default {
  palette,
  screens,
  shadows,
};