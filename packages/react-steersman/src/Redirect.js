import React, { Component } from 'react';
import { string, object } from 'prop-types';

export default class Redirect extends Component {
  static propTypes = {
    path: string.isRequired,
  };

  static contextTypes = {
    history: object.isRequired,
  };

  componentWillMount() {
    if (this.context.history.location.pathname !== this.props.path) {
      this.context.history.push(this.props.path);
    }
  };

  render() {
    return null;
  }
}
