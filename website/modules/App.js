import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import withStyles from 'react-jss';
import Route from 'react-steersman/Route';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Docs from './screens/Docs';
import Contents from './screens/Contents';

const styles = ({ palette }) => ({
  '@global': {
    'html, body, #app': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      margin: 0,
      backgroundColor: palette.background,
      minHeight: '100%',
    },
    '#app': {
      maxWidth: 1000,
      margin: '0 auto',
      padding: 10,
      width: '100%',
    },
    '*:focus': {
      outlineStyle: 'dotted',
      outlineColor: palette.primaryLightColor,
      outlineWidth: 1,
      outlineOffset: 2,
    },
  },
});

@withStyles(styles)
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <TopBar />
        <Route path="/" children={Home} group="main" />
        <Route path="/docs/:component" children={Docs} group="main" />
        <Footer />
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
          titleTemplate={`%s | HISTORY`}
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            { name: 'charset', content: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
        />
      </Fragment>
    );
  }
}
