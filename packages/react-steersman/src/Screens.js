import React, { Component } from 'react';
import { func, number, object } from 'prop-types';
import Route from './Route';
import { screensPropTypes } from './props';

export default class Screens extends Component {

  static propTypes = {
    screens: screensPropTypes.isRequired,
  };

  static defaultProps = {};

  render() {
    const { screens } = this.props;
    const paths = Object.keys(screens);

    return paths.map(path => <Route key={path} path={path} children={screens[path]} />);
  }
}
