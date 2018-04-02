import React, { Component as ReactComponent } from 'react';
import { object } from 'prop-types';
import { withContext } from './Steersman';
import navigateTo from './navigateTo';

export default function withNav(Component) {

  const componentName = Component.displayName || Component.name;

  @withContext
  class NavigatedComponent extends ReactComponent {
    static displayName = `Navigated(${componentName})`;
    static WrappedComponent = Component;

    navigate = (path = 0) => {
      navigateTo(this.props.steersman.history, path);
    };

    render() {
      return <Component {...this.props} navigate={this.navigate} />;
    }
  }

  return NavigatedComponent;
}