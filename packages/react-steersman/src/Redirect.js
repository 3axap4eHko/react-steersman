import React, { Component } from 'react';
import { string, object } from 'prop-types';
import navigateTo from './navigateTo';
import { withContext } from './Steersman';

@withContext()
export default class Redirect extends Component {
  static propTypes = {
    steersman: object.isRequired,
    path: string.isRequired,
  };

  componentWillMount() {
    const { steersman, path } = this.props;
    if (steersman.SSR) {
      throw { url: path };
    } else {
      navigateTo(steersman.history, path);
    }
  };

  render() {
    return null;
  }
}
