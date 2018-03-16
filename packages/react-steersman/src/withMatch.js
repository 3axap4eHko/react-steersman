import React, { Component } from 'react';
import Match from './Match';

export default function withMatch(options) {
  const {
          group,
          path,
          exact,
          strict,
          props,
        } = options;

  return WrappedComponent => {

    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class MatchedComponent extends Component {
      static displayName = `Match(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return <Match
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