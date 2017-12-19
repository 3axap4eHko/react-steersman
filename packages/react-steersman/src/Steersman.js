import React, { Component } from 'react';
import { number, bool, object, func, oneOf } from 'prop-types';
import Transition from 'react-steersman-transition/Transition';
import { routeEventsPropTypes, routeEventsDefaultProps } from './propTypes';

export default class Steersman extends Component {

  static propTypes = {
    history: object.isRequired,
    routeTransition: func,
    timeout: number,
    ...routeEventsPropTypes,
  };

  static defaultProps = {
    routeTransition: Transition,
    timeout: 375,
    ...routeEventsDefaultProps,
  };

  static childContextTypes = {
    history: object,
    transitionTimeout: number,
    isMounted: func,
    routeTransition: func,
    ...routeEventsPropTypes,
  };

  mounted = false;

  onRouteUpdated = (routeProps, routeState) => {
    const { onRouteUpdated } = this.props;
    onRouteUpdated(routeProps, routeState);
  };

  getChildContext() {
    return {
      history: this.props.history,
      transitionTimeout: this.props.timeout,
      isMounted: () => this.mounted,
      routeTransition: this.props.routeTransition,
      onRouteUpdated: this.props.onRouteUpdated,
      onRouteEnter: this.props.onRouteEnter,
      onRouteEntering: this.props.onRouteEntering,
      onRouteEntered: this.props.onRouteEntered,
      onRouteExit: this.props.onRouteExit,
      onRouteExiting: this.props.onRouteExiting,
      onRouteExited: this.props.onRouteExited,
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
