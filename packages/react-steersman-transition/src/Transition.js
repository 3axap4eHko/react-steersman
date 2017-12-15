import React, { Component } from 'react';
import { number, string, func, bool, any, oneOf } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_INIT, STATUS_DOING, STATUS_DONE } from './constants';
import { transitionPropTypes, transitionDefaultProps } from './propTypes';

function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

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

  static propTypes = transitionPropTypes;

  static defaultProps = transitionDefaultProps;

  state = {
    direction: this.props.direction,
    status: STATUS_DONE,
    props: {},
  };

  unmounted = false;

  cancel = () => {};

  setStateAsync = state => {
    return new Promise((resolve) => this.setState(state, resolve));
  };

  setStatus = async (direction, status) => {
    const { extraProps } = this.props;
    const props = typeof extraProps === 'function' ? extraProps(direction, status) : extraProps;
    await this.setStateAsync({ direction, status, props });
    await this.props[propsMap[direction][status]](direction, status);
  };

  setDirection = async direction => {
    this.cancel();
    let canceled = false;
    this.cancel = () => canceled = true;

    await this.setStatus(direction, STATUS_INIT);

    if (canceled || this.unmounted) {
      return;
    }

    await this.setStatus(direction, STATUS_DOING);

    if (canceled || this.unmounted) {
      return;
    }

    await wait(this.props.timeout);

    if (canceled || this.unmounted) {
      return;
    }

    await this.setStatus(direction, STATUS_DONE);
  };

  async componentDidMount() {
    if (this.props.startOnMount) {
      await this.setDirection(this.props.direction);
    }
  }

  async componentWillReceiveProps({ direction, force }) {
    if (this.props.direction !== direction || (force && this.props.force !== force)) {
      await this.setDirection(direction);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { children } = this.props;
    const { direction, status, props } = this.state;
    return children({ direction, status, ...props });
  }
}
