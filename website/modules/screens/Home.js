import React, { Component } from 'react';
import withStyles from 'react-jss';
import Text from 'react-typographic';
import Page from '../components/Page';
import Link from '../components/Link';
import logo from './Logo.svg';

const styles = ({ palette }) => ({
  container: {
    display: 'flex',
  },
  logo: {
    display: 'flex',
    flex: '1 1 0%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    maxWidth: 256,
    maxHeight: 256,
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  button: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    backgroundColor: palette.secondaryColor,
    borderRadius: 25,
    '&:hover': {
      color: palette.primaryTextColor,
    }
  },
  sandbox: {
    flex: 1,
    border: 0,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 10,
  }
});

@withStyles(styles)
export default class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Page>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img className={classes.logoImage} src={logo} />
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
        </div>
        <div className={classes.buttonContainer}>
          <Link
            to="/docs/Steersman"
            className={classes.button}
            title="Documentation"
          />
        </div>
        <iframe
          src="https://codesandbox.io/embed/kmlzm4rpvr"
          className={classes.sandbox}
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </Page>
    );
  }
}
