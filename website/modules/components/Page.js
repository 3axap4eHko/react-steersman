import React, { Component } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import withStyles from 'react-jss';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

@withStyles(styles)
export default class Page extends Component {
  render() {
    const { classes, className, children } = this.props;
    return (
      <div className={`${classes.root} ${className}`}>
        {children}
        <Helmet>

        </Helmet>
      </div>
    );
  }
}
