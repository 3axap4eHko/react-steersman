import { func, object, oneOfType, objectOf, shape, bool, string } from 'prop-types';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-steersman-transition/propTypes';

const nop = () => {};

export const matchPropTypes = {
  children: func.isRequired,
  path: string,
  exact: bool,
  strict: bool,
  props: object,
};

export const matchDefaultProps = {
  path: '/',
  exact: true,
  strict: false,
  props: {},
};

export const routeEventsPropTypes = {
  onUpdated: func,
  ...transitionEventsPropTypes,
};

export const routeEventsDefaultProps = {
  onUpdated: nop,
  ...transitionEventsDefaultProps,
};

const screenFullPropTypes = shape({
  component: func.isRequired,
  props: object,
  options: object,
});

const screenShortPropTypes = func;

export const screenPropTypes = oneOfType([screenFullPropTypes, screenShortPropTypes]);

export const screensPropTypes = objectOf(screenPropTypes);