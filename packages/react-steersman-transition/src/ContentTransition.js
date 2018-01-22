import React, { Component } from 'react';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_DONE } from './constants';
import Transition, { propsMap } from './Transition';
import { contentTransitionPropTypes, contentTransitionDefaultProps } from './propTypes';

function getDirection(show) {
  return [DIRECTION_EXIT, DIRECTION_ENTER][show | 0];
}

export default class ContentTransition extends Component {

  static propTypes = contentTransitionPropTypes;

  static defaultProps = contentTransitionDefaultProps;

  state = {
    direction: getDirection(this.props.display),
    rendered: this.props.display,
    timestamp: Date.now(),
  };

  componentWillReceiveProps(nextProps) {
    const direction = getDirection(nextProps.display);
    this.setState({
      direction,
      rendered: nextProps.display || this.state.rendered,
      timestamp: Date.now(),
    });
  }

  onTransition = args => {
    const { direction, status } = args;
    const event = propsMap[direction][status];
    const rendered = direction !== DIRECTION_EXIT || status !== STATUS_DONE || this.props.display;
    this.setState({ rendered, timestamp: Date.now() });
    if (this.props[event]) {
      this.props[event](args);
    }
  };

  render() {
    const { rendered, direction } = this.state;
    const { timestamp, timeout, mapProps, startOnMount, keepContentMounted, children, props } = this.props;
    if (!keepContentMounted && !rendered) {
      return null;
    }
    return (
      <Transition
        force={timestamp}
        timeout={timeout}
        direction={direction}
        onEnter={this.onTransition}
        onEntering={this.onTransition}
        onEntered={this.onTransition}
        onExit={this.onTransition}
        onExiting={this.onTransition}
        onExited={this.onTransition}
        mapProps={mapProps}
        startOnMount={startOnMount}
        props={props}
        children={children}
      />
    );
  }
}
