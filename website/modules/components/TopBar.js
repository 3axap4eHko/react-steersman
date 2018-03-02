import React, { Component } from 'react';
import withStyles from 'react-jss';
import Text from 'react-typographic';

const styles = ({ palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subBrand: {
    opacity: 0.8,
  },
  link: {
    color: palette.primaryTextColor,
    padding: 10,
  }
});

@withStyles(styles)
export default class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Text type="title" transform="uppercase">PRO JS <span className={classes.subBrand}>/ React Steersman</span></Text>
        </div>
        <div className={classes.nav}>
          <a href="https://github.com/3axap4eHko/react-steersman" className={classes.link} title="GitHub">GitHub</a>
          <a href="https://www.npmjs.com/package/react-steersman" className={classes.link} title="NPM">NPM</a>
        </div>
      </div>
    );
  }
}
