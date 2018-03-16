import React from 'react';
import { func, object, oneOfType, objectOf, shape, bool, string, any, number } from 'prop-types';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-transistor/props';

const nop = () => {};

const mapProps = props => props;

export const matchPropTypes = {
  children: func.isRequired,
  group: string,
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

export const routeGroupPropTypes = {
  ...routePropTypes,
  group: string,
};

export const routeGroupDefaultProps = {
  ...routeDefaultProps,
  group: 'default',
};

const screenFullPropTypes = shape({
  component: func.isRequired,
  props: object,
  options: object,
});

export const steersmanPropTypes = {
  history: object.isRequired,
  transitionTimeout: number,
  mapProps: func,
  ...routeEventsPropTypes,
};

export const steersmanDefaultProps = {
  transitionTimeout: 0,
  mapProps,
  ...routeEventsDefaultProps,
};

const screenShortPropTypes = func;

export const screenPropTypes = oneOfType([screenFullPropTypes, screenShortPropTypes]);

export const screensPropTypes = objectOf(screenPropTypes);