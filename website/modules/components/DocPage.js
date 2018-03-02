import React, { Component } from 'react';
import {} from 'prop-types';
import Page from './Page';

export default class DocPage extends Component {
  render() {
    const { children, className, match } = this.props;

    return (
      <Page className={className}>
        {children}
      </Page>
    );
  }
}
