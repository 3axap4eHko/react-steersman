import React, { Component } from 'react';
import {} from 'prop-types';

export default class TransitionClass extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}
