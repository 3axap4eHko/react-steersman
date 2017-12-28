import React, { Component } from 'react';
import { number, bool, object, func, oneOf } from 'prop-types';
import { routeEventsPropTypes, routeEventsDefaultProps } from './propTypes';

export default class Steersman extends Component {

  static propTypes = {
    history: object.isRequired,
    transitionTimeout: number,
    ...routeEventsPropTypes,
  };

  static defaultProps = {
    transitionTimeout: 0,
    ...routeEventsDefaultProps,
  };

  static childContextTypes = {
    history: object,
    isMounted: func,
    transitionTimeout: number,
    ...routeEventsPropTypes,
  };

  mounted = false;

  getChildContext() {
    return {
      history: this.props.history,
      transitionTimeout: this.props.transitionTimeout,
      isMounted: () => this.mounted,
      onUpdated: this.props.onUpdated,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
