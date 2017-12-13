import React, { Component } from 'react';
import { number, string, func, bool, any, oneOf } from 'prop-types';

function time(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const nop = () => {};

export const DIRECTION_ENTER = 'enter';
export const DIRECTION_EXIT = 'exit';

export const STATUS_INIT = 'init';
export const STATUS_DOING = 'doing';
export const STATUS_DONE = 'done';

const propsMap = {
  [DIRECTION_ENTER]: {
    [STATUS_INIT]: 'onEnter',
    [STATUS_DOING]: 'onEntering',
    [STATUS_DONE]: 'onEntered',
  },
  [DIRECTION_EXIT]: {
    [STATUS_INIT]: 'onExit',
    [STATUS_DOING]: 'onExiting',
    [STATUS_DONE]: 'onExited',
  },
};

export default class Transition extends Component {

  static propTypes = {
    timeout: number.isRequired,
    children: func.isRequired,
    direction: oneOf([DIRECTION_ENTER, DIRECTION_EXIT]),
    startOnMount: bool,
    force: any,
    onEnter: func,
    onEntering: func,
    onEntered: func,
    onExit: func,
    onExiting: func,
    onExited: func,
  };

  static defaultProps = {
    direction: DIRECTION_ENTER,
    startOnMount: false,
    force: any,
    onEnter: nop,
    onEntering: nop,
    onEntered: nop,
    onExit: nop,
    onExiting: nop,
    onExited: nop,
  };

  state = {
    direction: this.props.direction,
    status: STATUS_DONE,
  };

  unmounted = false;

  cancel = nop;

  setStateAsync = state => {
    return new Promise((resolve) => this.setState(state, resolve));
  };

  setDirection = async direction => {
    this.cancel();
    let canceled = false;
    this.cancel = () => canceled = true;

    await this.setStateAsync({ direction, status: STATUS_INIT });
    await this.props[propsMap[direction][STATUS_INIT]]();

    if (canceled || this.unmounted) {
      return;
    }

    await this.setStateAsync({ direction, status: STATUS_DOING });
    await this.props[propsMap[direction][STATUS_DOING]]();

    if (canceled || this.unmounted) {
      return;
    }

    await time(this.props.timeout);

    if (canceled || this.unmounted) {
      return;
    }

    await this.setStateAsync({ direction, status: STATUS_DONE });
    await this.props[propsMap[direction][STATUS_DONE]]();
  };

  componentDidMount() {
    if (this.props.startOnMount) {
      this.setDirection(this.props.direction);
    }
  }

  componentWillReceiveProps({ direction, force }) {
    if (this.props.direction !== direction || (force && this.props.force !== force)) {
      this.setDirection(direction);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { children } = this.props;
    const { direction, status } = this.state;
    return children({ direction, status });
  }
}
