import React, { Component } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';

export default class Page extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={className}>
        {children}
        <Helmet>

        </Helmet>
      </div>
    );
  }
}
