import { any, bool, func, number, object, oneOf, oneOfType } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT } from './constants';

const nop = () => {};

export const transitionEventsPropTypes = {
  onEnter: func,
  onEntering: func,
  onEntered: func,
  onExit: func,
  onExiting: func,
  onExited: func,
};

export const transitionEventsDefaultProps = {
  onEnter: nop,
  onEntering: nop,
  onEntered: nop,
  onExit: nop,
  onExiting: nop,
  onExited: nop,
};

export const transitionPropTypes = {
  children: func.isRequired,
  timeout: number.isRequired,
  direction: oneOf([DIRECTION_ENTER, DIRECTION_EXIT]),
  startOnMount: bool,
  force: any,
  props: object,
  ...transitionEventsPropTypes,
};

export const transitionDefaultProps = {
  direction: DIRECTION_ENTER,
  startOnMount: false,
  force: any,
  props: {},
  ...transitionEventsDefaultProps,
};

export const contentTransitionPropTypes = {
  children: func.isRequired,
  timeout: number.isRequired,
  display: bool,
  props: object,
  startOnMount: bool,
  keepContentMounted: bool,
  ...transitionEventsPropTypes,
};

export const contentTransitionDefaultProps = {
  display: true,
  props: {},
  startOnMount: false,
  keepContentMounted: false,
  ...transitionEventsDefaultProps,
};