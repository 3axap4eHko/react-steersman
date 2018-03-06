import React, { Component } from 'react';
import {} from 'prop-types';
import withStyles from 'react-jss';
import RouteGroup from 'react-steersman/Route';
import Contents from './Contents';
import Page from '../components/Page';

import Menu from '../components/Menu';

const styles = ({ palette, screens }) => ({
  root: {
    [screens.smUp]: {
      flexDirection: 'row',
    },
  },
  menu: {
    flex: 1,
    [screens.smUp]: {
      maxWidth: 300,
      width: 300,
    },
  },
  list: {
    listStyle: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: palette.primaryLightColor,
  },
  contents: {
    flex: 1,
    [screens.smUp]: {
      maxWidth: 'calc(100% - 300px)',
      minWidth: 'calc(100% - 300px)',
    },
  }
});


const menu = {
  'React Steersman': [
    'Steersman',
    'Match',
    'MatchGroup',
    'Route',
    'RouteGroup',
    'RouteContext',
    'Redirect',
    'createLink',
    'navigate',
    'withNav',
  ],
  'React Transistor': [
    'Transition',
    'ContentTransition',
  ],
  'UriIL': [
    'Pattern',
    'URI',
  ],
};

@withStyles(styles)
export default class Docs extends Component {

  render() {
    const { classes, match } = this.props;
    const { component } = (match || {});

    return (
      <Page className={classes.root}>
        <Menu menu={menu} />
        <Contents className={classes.contents} menu={menu} component={component} />
      </Page>
    );
  }
}
