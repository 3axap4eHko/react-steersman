import React, { Component } from 'react';
import { number, func } from 'prop-types';
import { routeEventsPropTypes } from './props';

export default class RouteContext extends Component {

  static contextTypes = {
    transitionTimeout: number.isRequired,
    mapProps: func,
    ...routeEventsPropTypes,
  };

  static childContextTypes = {
    transitionTimeout: number,
    mapProps: func,
    ...routeEventsPropTypes,
  };

  getChildContext() {
    return {
      transitionTimeout: this.props.transitionTimeout || this.context.transitionTimeout,
      mapProps: this.props.mapProps || this.context.mapProps,
      onUpdated: this.props.onUpdated || this.context.onUpdated,
      onEnter: this.props.onEnter || this.context.onEnter,
      onEntering: this.props.onEntering || this.context.onEntering,
      onEntered: this.props.onEntered || this.context.onEntered,
      onExit: this.props.onExit || this.context.onExit,
      onExiting: this.props.onExiting || this.context.onExiting,
      onExited: this.props.onExited || this.context.onExited,
    };
  }

  render() {
    return this.props.children;
  }
}
