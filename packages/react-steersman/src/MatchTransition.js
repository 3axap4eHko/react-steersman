import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT } from 'react-steersman-transition/Transition';
import Match from './Match';

const nop = () => {};

export default class Route extends Component {

  static propTypes = {
    render: func.isRequired,
    transition: func,
    path: string,
    onEnter: func,
    onEntering: func,
    onEntered: func,
    onExit: func,
    onExiting: func,
    onExited: func,
  };

  static defaultProps = {
    path: '/',
    onEnter: nop,
    onEntering: nop,
    onEntered: nop,
    onExit: nop,
    onExiting: nop,
    onExited: nop,
  };

  static contextTypes = {
    history: object,
    routeTransition: func,
    onRouteEnter: func,
    onRouteEntering: func,
    onRouteEntered: func,
    onRouteExit: func,
    onRouteExiting: func,
    onRouteExited: func,
    onRouteUpdated: func,
  };

  setStateAsync = state => {
    return new Promise((resolve) => this.setState(state, resolve));
  };

  onEnter = async () => {
    console.log(`route ${this.props.path} enter`);
    await this.props.onEnter();
    await this.context.onRouteEnter(this.props, this.state);
  };

  onEntering = async () => {
    console.log(`route ${this.props.path} entering`);
    await this.props.onEntering();
    await this.context.onRouteEntering(this.props, this.state);
  };

  onEntered = async () => {
    console.log(`route ${this.props.path} entered`);
    await this.props.onEntered();
    await this.context.onRouteEntered(this.props, this.state);
  };

  onExit = async () => {
    console.log(`route ${this.props.path} exit`);
    await this.props.onExit();
    await this.context.onRouteExit(this.props, this.state);
  };

  onExiting = async () => {
    console.log(`route ${this.props.path} exiting`);
    await this.props.onExiting();
    await this.context.onRouteExiting(this.props, this.state);
  };

  onExited = async () => {
    console.log(`route ${this.props.path} exited`);
    await this.setStateAsync({ rendered: false, timestamp: Date.now() });
    await this.props.onExited();
    await this.context.onRouteExited(this.props, this.state);
  };

  onRouteUpdated = async ({ timestamp, match, pathname }) => {
    await this.setStateAsync({
      timestamp,
      match,
      pathname,
      direction: [DIRECTION_EXIT, DIRECTION_ENTER][(!match) | 0],
      rendered: !!match || this.state.rendered,
    });
    await this.context.onRouteUpdated(this.props, this.state);
  };

  state = {
    direction: DIRECTION_ENTER,
  };

  render() {
    const { direction, pathname, rendered } = this.state;
    if (!rendered) {
      return null;
    }
    const { render, transition, path, exact, strict } = this.props;
    const TransitionComponent = transition || this.context.routeTransition;

    return (
      <Match path={path} exact={exact} strict={strict}>
        {({ match, pathname }) => (
          <TransitionComponent
            key={pathname}
            direction={direction}
            onEnter={this.onEnter}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExit={this.onExit}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            {({ direction, status }) => render({ match, direction, status })}
          </TransitionComponent>
        )}
      </Match>

    );
  }
}
