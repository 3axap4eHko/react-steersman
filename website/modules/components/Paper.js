import React, { Component } from 'react';
import { string, number, bool, oneOf } from 'prop-types';
import classNames from 'classnames';
import withStyles from 'react-jss';
import shadows from './shadows';

const styles = ({ palette }) => ({
  root: {
    display: 'flex',
    //backgroundColor: palette.backgroundLight,
    borderRadius: 4,
    padding: 16,
    color: palette.primaryTextColor,
  },
  columnDirection: {
    flexDirection: 'column',
  },
  ...shadows,
});

const elevations = Array.from({ length: 25 }).map((v, i) => i);

@withStyles(styles)
export default class Paper extends Component {
  static propTypes = {
    elevation: oneOf(elevations),
    column: bool,
  };

  static defaultProps = {
    elevation: 0,
    column: false,
  };

  render() {
    const { classes, className, elevation, column, children } = this.props;
    const shadowClassName = classes[`elevation${elevation}`];

    return (
      <div className={classNames(classes.root, column && classes.columnDirection, shadowClassName, className)}>
        {children}
      </div>
    );
  }
}
