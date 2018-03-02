import React, { Component } from 'react';
import {} from 'prop-types';
import withStyles from 'react-jss';
import Paper from '../components/Paper';
import Page from '../components/Page';
import Link from '../components/Link';
import Text from 'react-typographic';

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
export default class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper>
          <div className={classes.logo}>

          </div>

          <div className={classes.description}>
            <Text type="subheading" transform="uppercase">Tiny and fast react navigation library</Text>
            <Text type="display3" transform="uppercase">REACT STEERSMAN</Text>
            <Text>
              React &lt;Steersman&gt; is a collection of navigation components that allows you control rendering and navigation of your application and match parameters from the location.
              React &lt;Steersman&gt; works for browser and mobile by the same way and you don't need create separate code for different platforms anymore.
              It good to use in universal application with universal components.
            </Text>
          </div>
        </Paper>
        <div className={classes.buttonContainer}>
          <Link
            to="/docs"
            className={classes.button}
            title="Documentation"
          />
        </div>
      </div>
    );
  }
}
