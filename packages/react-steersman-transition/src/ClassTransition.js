import React, { Component } from 'react';
import { bool, oneOf, number, any, func } from 'prop-types';
import Transition from './Transition';
import { transitionPropTypes, transitionDefaultProps } from './propTypes';

function reFlow(className) {
  if (typeof document !== 'undefined') {
    (document.querySelector(`.${className}`) || {}).scrollTop;
  }
}

function defaultClassNameGenerator({ direction, status }) {
  return `transition-${direction}-${status}`;
}

export default class TransitionClass extends Component {
  static propTypes = {
    classNameGenerator: func,
    ...transitionPropTypes,
  };

  static defaultProps = {
    classNameGenerator: defaultClassNameGenerator,
    ...transitionDefaultProps,
  };

  onEnter = (direction, status) => {
    const className = this.props.classNameGenerator({ direction, status });
    reFlow(className);
    this.props.onEnter(direction, status);
  };

  onExit = (direction, status) => {
    const className = this.props.classNameGenerator({ direction, status });
    reFlow(className);
    this.props.onExit(direction, status);
  };

  render() {
    const { classNameGenerator, children, ...props } = this.props;
    return (
      <Transition
        {...props}
        onEnter={this.onEnter}
        onExit={this.onExit}
      >
        {transition => children({ transitionClassName: classNameGenerator(transition), ...transition })}
      </Transition>
    );
  }
}
