import React from 'react';
import { func, object, oneOfType, oneOf, objectOf, shape, bool, string, any, number } from 'prop-types';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-transistor/props';

const nop = () => {};

const mapProps = props => props;

export const matchPropTypes = {
  children: func.isRequired,
  steersman: object.isRequired,
  group: any,
  path: string,
  exact: bool,
  strict: bool,
  props: object,
};

export const matchDefaultProps = {
  group: '',
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
  ...matchDefaultProps,
  ...routeEventsDefaultProps,
};

export const steersmanPropTypes = {
  history: object.isRequired,
  SSR: bool,
  transitionTimeout: number,
  mapProps: func,
  ...routeEventsPropTypes,
};

export const steersmanDefaultProps = {
  transitionTimeout: 0,
  ssr: false,
  mapProps,
  ...routeEventsDefaultProps,
};
