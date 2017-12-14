import { any, bool, func, number, oneOf } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT } from './constants';

const nop = () => {};

export const transitionPropTypes = {
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

export const transitionDefaultProps = {
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