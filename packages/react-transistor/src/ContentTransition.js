import React, { Component } from 'react';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_DONE } from './constants';
import Transition, { propsMap } from './Transition';
import { contentTransitionPropTypes, contentTransitionDefaultProps } from './props';

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
    props: this.props.props,
  };

  componentWillReceiveProps(nextProps) {
    const direction = getDirection(nextProps.display);
    const rendered = nextProps.display || this.state.rendered;
    const props = nextProps.freezePropsOnExit && direction === DIRECTION_EXIT ? this.props.props : nextProps.props;

    this.setState({
      direction,
      rendered,
      timestamp: Date.now(),
      props,
    });
  }

  onTransition = async args => {
    const { direction, status } = args;
    const event = propsMap[direction][status];
    const rendered = direction !== DIRECTION_EXIT || status !== STATUS_DONE || this.props.display;
    this.setState({ rendered, timestamp: Date.now() });
    if (this.props[event]) {
      await this.props[event](args);
    }
  };

  render() {
    const { rendered, direction, props } = this.state;
    const { timestamp, timeout, mapProps, startOnMount, keepContentMounted, children } = this.props;
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
