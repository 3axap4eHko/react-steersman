import React, { Component } from 'react';
import { number, string, object, func } from 'prop-types';
import MatchGroup from './MatchGroup';
import Route from './Route';
import { routeGroupPropTypes, routeGroupDefaultProps } from './props';

export default class RouteGroup extends Component {
  static propTypes = routeGroupPropTypes;

  static defaultProps = {
    matcher: MatchGroup,
    ...routeGroupDefaultProps,
  };

  render() {
    return (
      <Route {...this.props} />
    );
  }
}
