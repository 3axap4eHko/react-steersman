import React, { Component } from 'react';
import { bool, object, func, oneOf } from 'prop-types';
import Transition from 'react-steersman-transition/Transition';
import { routeEventsPropTypes, routeEventsDefaultProps } from './propTypes';

function DefaultTransition({ children, ...props }) {
  return (
    <Transition {...props} timeout={375}>
      {transition => children(transition)}
    </Transition>
  );
}

export default class Steersman extends Component {

  static propTypes = {
    history: object.isRequired,
    routeTransition: func,
    ...routeEventsPropTypes,
  };

  static defaultProps = {
    routeTransition: DefaultTransition,
    ...routeEventsDefaultProps,
  };

  static childContextTypes = {
    history: object,
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
