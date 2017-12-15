import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import Match from './Match';
import MatchTransition from './MatchTransition';
import { transitionEventsPropTypes, transitionEventsDefaultProps } from 'react-steersman-transition/propTypes';

export default class Route extends Component {

  static propTypes = {
    render: func.isRequired,
    path: string,
    transition: func,
    ...transitionEventsPropTypes,
  };

  static defaultProps = {
    path: '/',
    ...transitionEventsDefaultProps,
  };

  static contextTypes = {
    history: object.isRequired,
  };

  render() {
    const { render: Component, path, exact, strict, ...restProps } = this.props;
    const { history } = this.context;
    return (
      <Match path={path} exact={exact} strict={strict}>
        {({ match, pathname }) => (
          <MatchTransition match={match} pathname={pathname} {...restProps}>
            {props => <Component pathname={pathname} history={history} {...props} />}
          </MatchTransition>
        )}
      </Match>

    );
  }
}
