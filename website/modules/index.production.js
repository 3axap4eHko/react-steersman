import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createHashHistory from 'react-steersman/createHashHistory';
import { setTheme } from 'react-typographic';
import { ThemeProvider } from 'react-jss';

import AppContainer from './App';

import theme from './theme';

setTheme({
  color: theme.palette.primaryTextColor,
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
});

function mapProps(props) {
  const { direction, status } = props;
  return {
    ...props,
    transitionClassName: `page-animation page-${direction}-${status}`,
  };
}

const Root = () => (
  <ThemeProvider theme={theme}>
    <Steersman history={createHashHistory()} transitionTimeout={375} mapProps={mapProps}>
      <AppContainer />
    </Steersman>
  </ThemeProvider>
);

if (!module.hot) {
  render(<Root />, document.getElementById('app'));
}

export default Root;
