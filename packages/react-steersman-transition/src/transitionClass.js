import React, { Component } from 'react';
import { string } from 'prop-types';

export default function (transitionClassName) {
  return Component => {

    const componentName = Component.displayName || Component.name;

    return class TransitionClass extends Component {

      static displayName = `TransitionClass(${componentName})`;

      static WrappedComponent = Component;

      static propTypes = {
        direction: string.isRequired,
        status: string.isRequired,
      };

      render() {
        const { className, direction, status, ...props } = this.props;
        const classes = [className, transitionClassName, `${transitionClassName}--${direction}-${status}`].filter(c => c);
        return <Component className={classes.join(' ')} {...props} />;
      }
    };
  };
}