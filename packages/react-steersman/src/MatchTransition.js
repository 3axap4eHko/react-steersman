import React, { Component } from 'react';
import { bool, string, object, func } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT } from 'react-steersman-transition/Transition';

const nop = () => {};

export default class MatchTransition extends Component {

  static propTypes = {
    children: func.isRequired,
    match: object,
    onEnter: func,
    onEntering: func,
    onEntered: func,
    onExit: func,
    onExiting: func,
    onExited: func,
    transition: func,
  };

  static defaultProps = {
    onEnter: nop,
    onEntering: nop,
    onEntered: nop,
    onExit: nop,
    onExiting: nop,
    onExited: nop,
  };

  static contextTypes = {
    history: object,
    isMounted: func,
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
    await this.props.onEnter();
    await this.context.onRouteEnter(this.props, this.state);
  };

  onEntering = async () => {
    await this.props.onEntering();
    await this.context.onRouteEntering(this.props, this.state);
  };

  onEntered = async () => {
    await this.props.onEntered();
    await this.context.onRouteEntered(this.props, this.state);
  };

  onExit = async () => {
    await this.props.onExit();
    await this.context.onRouteExit(this.props, this.state);
  };

  onExiting = async () => {
    await this.props.onExiting();
    await this.context.onRouteExiting(this.props, this.state);
  };

  onExited = async () => {
    await this.setStateAsync({ rendered: false, timestamp: Date.now() });
    await this.props.onExited();
    await this.context.onRouteExited(this.props, this.state);
  };

  state = {
    match: this.props.match,
    direction: [DIRECTION_EXIT, DIRECTION_ENTER][(!!this.props.match) | 0],
    rendered: !!this.props.match,
    timestamp: Date.now(),
  };

  async componentWillReceiveProps({ match }) {
    const rendered = !!match;
    await this.setStateAsync({
      match: match || this.state.match,
      direction: [DIRECTION_EXIT, DIRECTION_ENTER][(rendered) | 0],
      rendered: rendered || this.state.rendered,
      timestamp: Date.now(),
    });
    await this.context.onRouteUpdated(this.props, this.state);
  }

  render() {
    const { direction, rendered, timestamp, match } = this.state;
    if (!rendered) {
      return null;
    }
    const { routeTransition, isMounted } = this.context;
    const { transition, children, startOnMount } = this.props;
    const TransitionComponent = transition || routeTransition;

    return (
      <TransitionComponent
        key={timestamp}
        direction={direction}
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
        startOnMount={isMounted() || startOnMount}
      >
        {({ direction, status }) => children({ direction, status, match })}
      </TransitionComponent>
    );
  }
}
