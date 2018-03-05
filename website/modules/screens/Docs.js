import React, { Component } from 'react';
import {} from 'prop-types';
import withStyles from 'react-jss';
import Text from 'react-typographic';
import Paper from '../components/Paper';
import Page from '../components/Page';
import Link from '../components/Link';
import TransitionDoc from '../../../docs/Transition.md';

const styles = ({ palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  logo: {
    display: 'flex',
    flex: '1 1 0%',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    backgroundColor: palette.secondaryColor,
    borderRadius: 25,
  },
});

@withStyles(styles)
export default class Docs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

      </div>
    );
  }
}
