import React, { Component } from 'react';
import Transition from './Transition';

export default function withTransition(options) {
  const {
          timeout,
          direction,
          mapProps,
          startOnMount,
          freezePropsOnExit,
          props,
        } = options;

  return WrappedComponent => {

    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class TransitionComponent extends Component {
      static displayName = `Transition(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return <Transition
          timeout={timeout}
          direction={direction}
          mapProps={mapProps}
          startOnMount={startOnMount}
          freezePropsOnExit={freezePropsOnExit}
          props={{ ...props, ...this.props }}
          children={WrappedComponent}
        />;
      }
    };
  };
}