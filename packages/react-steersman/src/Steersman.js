import React, { Component } from 'react';
import { bool, object, func, oneOf } from 'prop-types';
import Transition from 'react-steersman-transition/Transition';

function DefaultTransition({ children, ...props }) {
  return (
    <Transition {...props} timeout={375}>
      {transition => children(transition)}
    </Transition>
  );
}

const nop = () => {};

export default class Steersman extends Component {

  static propTypes = {
    history: object.isRequired,
    routeTransition: func,
    onRouteUpdated: func,
    onRouteEnter: func,
    onRouteEntering: func,
    onRouteEntered: func,
    onRouteExit: func,
    onRouteExiting: func,
    onRouteExited: func,
  };

  static defaultProps = {
    routeTransition: DefaultTransition,
    onRouteUpdated: nop,
    onRouteEnter: nop,
    onRouteEntering: nop,
    onRouteEntered: nop,
    onRouteExit: nop,
    onRouteExiting: nop,
    onRouteExited: nop,
  };

  static childContextTypes = {
    history: object,
    isMounted: func,
    routeTransition: func,
    onRouteUpdated: func,
    onRouteEnter: func,
    onRouteEntering: func,
    onRouteEntered: func,
    onRouteExit: func,
    onRouteExiting: func,
    onRouteExited: func,
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
