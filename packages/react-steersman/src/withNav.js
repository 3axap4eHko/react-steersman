import React, { Component as ReactComponent } from 'react';
import { object } from 'prop-types';

export default function withNav(Component) {

  const componentName = Component.displayName || Component.name;

  return class NavigatedComponent extends ReactComponent {
    static displayName = `Navigated(${componentName})`;
    static WrappedComponent = Component;

    static contextTypes = {
      history: object.isRequired,
    };

    navigate = (path = 0) => {
      const { history } = this.context;
      switch (typeof path) {
        case 'string':
          if (history.location.pathname !== path) {
            history.push(path);
          }
          break;
        case 'number':
          if (path === 0) {
            history.replace(history.location.pathname);
          } else {
            history.go(path);
          }
          break;
      }
    };

    render() {
      return <Component {...this.props} navigate={this.navigate} />;
    }
  };
}