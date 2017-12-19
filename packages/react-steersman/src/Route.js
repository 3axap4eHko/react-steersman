import React, { Component } from 'react';
import { number, string, object, func } from 'prop-types';
import Match from './Match';
import MatchTransition from './MatchTransition';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-steersman-transition/propTypes';

export default class Route extends Component {

  static propTypes = {
    render: func.isRequired,
    path: string,
    transition: func,
    timeout: number,
    ...transitionEventsPropTypes,
  };

  static defaultProps = {
    path: '/',
    ...transitionEventsDefaultProps,
  };

  static contextTypes = {
    history: object.isRequired,
    transitionTimeout: number,
    routeTransition: func,
  };

  static childContextTypes = {
    routeTransition: func,
    transitionTimeout: number,
  };

  getChildContext() {
    return {
      routeTransition: this.props.transition || this.context.routeTransition,
    };
  }

  render() {
    const { render: Component, path, exact, strict, timeout, ...restProps } = this.props;
    const { history } = this.context;
    const transitionTimeout = timeout || this.context.transitionTimeout;

    return (
      <Match path={path} exact={exact} strict={strict}>
        {({ match, pathname }) => (
          <MatchTransition match={match} pathname={pathname} timeout={transitionTimeout} {...restProps}>
            {props => <Component pathname={pathname} history={history} {...props} />}
          </MatchTransition>
        )}
      </Match>

    );
  }
}
