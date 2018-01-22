import React from 'react';
import { func, object, oneOfType, objectOf, shape, bool, string, any, number } from 'prop-types';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-steersman-transition/propTypes';

const nop = () => {};

const mapProps = props => props;

export const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

const linkNativePropTypes = {
  style: any,
  activeStyle: any,
  onPress: func,
};

const linkWebPropTypes = {
  style: object,
  activeStyle: object,
  className: string,
  activeClassName: string,
  onClick: func,
};

export const linkPropTypes = {
  to: string.isRequired,
  title: string.isRequired,
  component: func,
  exact: bool,
  strict: bool,
  ...(isReactNative ? linkNativePropTypes : linkWebPropTypes),
};

export const linkDefaultProps = isReactNative
  ? {
    onPress: nop,
    component: require('react-native').Button,
  }
  : {
    onClick: nop,
    component: props => <a {...props} />,
  };

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

export const routePropTypes = {
  mapProps: func,
  transitionTimeout: number,
  ...matchPropTypes,
  ...routeEventsPropTypes,
};

export const routeDefaultProps = {
  mapProps,
  ...matchDefaultProps,
  ...routeEventsDefaultProps,
};

const screenFullPropTypes = shape({
  component: func.isRequired,
  props: object,
  options: object,
});

const screenShortPropTypes = func;

export const screenPropTypes = oneOfType([screenFullPropTypes, screenShortPropTypes]);

export const screensPropTypes = objectOf(screenPropTypes);