import { func } from 'prop-types';

const nop = () => {};

export const routeEventsPropTypes = {
  onRouteEnter: func,
  onRouteEntering: func,
  onRouteEntered: func,
  onRouteExit: func,
  onRouteExiting: func,
  onRouteExited: func,
  onRouteUpdated: func,
};

export const routeEventsDefaultProps = {
  onRouteEnter: nop,
  onRouteEntering: nop,
  onRouteEntered: nop,
  onRouteExit: nop,
  onRouteExiting: nop,
  onRouteExited: nop,
  onRouteUpdated: nop,
};