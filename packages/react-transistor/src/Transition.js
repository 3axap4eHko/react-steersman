import React, { Component } from 'react';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_START, STATUS_ACTIVE, STATUS_DONE } from './constants';
import { transitionPropTypes, transitionDefaultProps } from './props';

function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const propsMap = {
  [DIRECTION_ENTER]: {
    [STATUS_START]: 'onEnter',
    [STATUS_ACTIVE]: 'onEntering',
    [STATUS_DONE]: 'onEntered',
  },
  [DIRECTION_EXIT]: {
    [STATUS_START]: 'onExit',
    [STATUS_ACTIVE]: 'onExiting',
    [STATUS_DONE]: 'onExited',
  },
};

export default class Transition extends Component {

  static propTypes = transitionPropTypes;

  static defaultProps = transitionDefaultProps;

  state = {
    direction: this.props.direction,
    status: STATUS_DONE,
  };

  unmounted = false;
  mounting = new Promise(resolve => this.mountCallback = resolve);

  cancel = () => {};

  setStateAsync = state => {
    return new Promise((resolve) => this.setState(state, resolve));
  };

  fireEvent = async (direction, status) => {
    await this.setStateAsync({ direction, status });
    await this.props[propsMap[direction][status]]({ direction, status, ...this.props.props });
  };

  setDirection = async direction => {
    this.cancel();
    let canceled = false;
    this.cancel = () => canceled = true;

    if (this.props.timeout !== 0) {
      await this.fireEvent(direction, STATUS_START);

      if (canceled || this.unmounted) {
        return;
      }
      await this.mounting;
      await this.fireEvent(direction, STATUS_ACTIVE);

      if (canceled || this.unmounted) {
        return;
      }

      await wait(this.props.timeout);
    }

    if (canceled || this.unmounted) {
      return;
    }

    await this.fireEvent(direction, STATUS_DONE);
  };

  async componentWillMount() {
    this.unmounted = false;
    if (!this.props.startOnMount) {
      await this.fireEvent(this.props.direction, STATUS_DONE);
    } else {
      await this.setDirection(this.props.direction);
    }
  }

  componentDidMount() {
    this.mountCallback();
  }

  async componentWillReceiveProps({ direction, force }) {
    if (this.props.direction !== direction || (force && this.props.force !== force)) {
      await this.setDirection(direction);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.direction !== nextState.direction ||
      this.state.status !== nextState.status ||
      this.props.children !== nextProps.children ||
      this.props.props !== nextProps.props;
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { direction, status } = this.state;
    const { mapProps, props, ...ownProps } = this.props;
    const { children: Content } = ownProps;
    const mappedProps = mapProps({ ...props, direction, status }, ownProps);

    return <Content {...mappedProps} />;
  }
}
