import React, { Component as ReactComponent } from 'react';
import { object } from 'prop-types';
import navigateTo from './navigateTo';

export default function withNav(Component) {

  const componentName = Component.displayName || Component.name;

  return class NavigatedComponent extends ReactComponent {
    static displayName = `Navigated(${componentName})`;
    static WrappedComponent = Component;

    static contextTypes = {
      history: object.isRequired,
    };

    navigate = (path = 0) => {
      navigateTo(this.context.history, path);
    };

    render() {
      return <Component {...this.props} navigate={this.navigate} />;
    }
  };
}