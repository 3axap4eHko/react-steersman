import React, { Component } from 'react';
import Route from './Route';

export default function withRoute(options) {
  const {
          mapProps,
          transitionTimeout,
          group,
          path,
          exact,
          strict,
          props,
        } = options;

  return WrappedComponent => {

    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class RoutedComponent extends Component {
      static displayName = `Route(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return <Route
          mapProps={mapProps}
          transitionTimeout={transitionTimeout}
          group={group}
          path={path}
          exact={exact}
          strict={strict}
          props={{ ...props, ...this.props }}
          children={WrappedComponent}
        />;
      }
    };
  };
}