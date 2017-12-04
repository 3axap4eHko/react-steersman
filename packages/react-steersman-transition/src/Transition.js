import React, { Component } from 'react';
import { number, string, func, oneOf } from 'prop-types';

function time(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function nop() {}

export const STATUS_NONE = 'none';
export const STATUS_ENTER = 'enter';
export const STATUS_EXIT = 'exit';

const STATUS_MAP_START = 0;
const STATUS_MAP_FINISH = 1;

const statusMap = {
  [STATUS_NONE]: ['none', 'none'],
  [STATUS_ENTER]: ['entering', 'entered'],
  [STATUS_EXIT]: ['exiting', 'exited'],
};

export default class Transition extends Component {

  static propTypes = {
    timeout: number.isRequired,
    children: func.isRequired,
    status: oneOf([STATUS_NONE, STATUS_ENTER, STATUS_EXIT]),
    onEnter: func,
    onEntered: func,
    onExit: func,
    onExited: func,
  };

  static defaultProps = {
    status: STATUS_NONE,
    onEnter: nop,
    onEntered: nop,
    onExit: nop,
    onExited: nop,
  };

  state = {
    status: statusMap[this.props.status][STATUS_MAP_START],
  };

  unmounted = false;

  cancel = nop;

  setStatus = async status => {
    const { onEnter, onExit } = this.props;
    this.cancel();
    let canceled = false;
    this.cancel = () => canceled = true;
    await time(0);
    if (!canceled && !this.unmounted) {
      switch (status) {
        case STATUS_ENTER:
          this.setState({ status: statusMap[status][STATUS_MAP_START] });
          await onEnter();
          break;
        case STATUS_EXIT:
          this.setState({ status: statusMap[status][STATUS_MAP_START] });
          await onExit();
          break;
        default:
          this.cancel();
          break;
      }
      const { timeout } = this.props;

      await time(timeout);
      if (!canceled && !this.unmounted) {
        const { onEntered, onExited } = this.props;
        switch (status) {
          case STATUS_ENTER:
            this.setState({ status: statusMap[status][STATUS_MAP_FINISH] });
            await onEntered();
            break;
          case STATUS_EXIT:
            this.setState({ status: statusMap[status][STATUS_MAP_FINISH] });
            await onExited();
            break;
          default:
            this.cancel();
            break;
        }
      }
    }
  };

  componentDidMount() {
    this.setStatus(this.props.status);
  }

  componentWillReceiveProps({ status }) {
    if (this.props.status !== status) {
      this.setStatus(status);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { children } = this.props;
    const { status } = this.state;
    return children(status);
  }
}
