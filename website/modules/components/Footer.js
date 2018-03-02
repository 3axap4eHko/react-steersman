import React, { Component } from 'react';
import {} from 'prop-types';
import withStyles from 'react-jss';
import Text from 'react-typographic';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    opacity: 0.5,
  }
});

@withStyles(styles)
export default class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Text type="caption" className={classes.text}>© 2017-2018 Ivan Zakharchanka</Text>
        <Text type="caption" className={classes.text}>Code examples and documentation CC 4.0</Text>
      </div>
    );
  }
}
