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

const screens = {

  xs: '@media (max-width: 600px)',
  sm: '@media (min-width: 600px) and (max-width: 960px)',
  md: '@media (min-width: 960px) and (max-width: 1280px)',
  lg: '@media (min-width: 1280px) and (max-width: 1920px)',
  xl: '@media (min-width: 1920px)',

  smUp: '@media (min-width: 600px)',
  mdUp: '@media (min-width: 960px)',
  lgUp: '@media (min-width: 1280px)',
  xlUp: '@media (min-width: 1920px)',

  xsDown: '@media (max-width: 600px)',
  smDown: '@media (max-width: 960px)',
  mdDown: '@media (min-width: 1280px)',
  lgDown: '@media (min-width: 1920px)',

};

export default {
  palette,
  screens,
};