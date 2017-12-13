import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import Match from './Match';
import MatchTransition from './MatchTransition';

const nop = () => {};

export default class Route extends Component {

  static propTypes = {
    render: func.isRequired,
    path: string,
    onEnter: func,
    onEntering: func,
    onEntered: func,
    onExit: func,
    onExiting: func,
    onExited: func,
    transition: func,
  };

  static defaultProps = {
    path: '/',
    onEnter: nop,
    onEntering: nop,
    onEntered: nop,
    onExit: nop,
    onExiting: nop,
    onExited: nop,
  };

  render() {
    const { render, path, exact, strict, ...props } = this.props;
    return (
      <Match path={path} exact={exact} strict={strict}>
        {({ match, pathname }) =>  (
          <MatchTransition match={match} pathname={pathname} {...props}>
            {({ match, direction, status }) => render({ match, pathname, direction, status })}
          </MatchTransition>
        )}
      </Match>

    );
  }
}