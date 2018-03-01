import { any, bool, func, number, object, oneOf, oneOfType } from 'prop-types';
import { DIRECTION_ENTER, DIRECTION_EXIT } from './constants';

const nop = () => {};

const mapProps = props => props;

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
  mapProps: func,
  startOnMount: bool,
  force: any,
  props: object,
  ...transitionEventsPropTypes,
};

export const transitionDefaultProps = {
  direction: DIRECTION_ENTER,
  mapProps,
  startOnMount: false,
  force: false,
  props: {},
  ...transitionEventsDefaultProps,
};

export const contentTransitionPropTypes = {
  children: func.isRequired,
  timeout: number.isRequired,
  display: bool,
  props: object,
  mapProps: func,
  startOnMount: bool,
  keepContentMounted: bool,
  ...transitionEventsPropTypes,
};

export const contentTransitionDefaultProps = {
  display: true,
  props: {},
  mapProps,
  startOnMount: false,
  keepContentMounted: false,
  ...transitionEventsDefaultProps,
};