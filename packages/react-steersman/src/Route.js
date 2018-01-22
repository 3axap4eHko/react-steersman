import React, { Component } from 'react';
import { number, string, object, func } from 'prop-types';
import Match from './Match';
import ContentTransition from 'react-steersman-transition/ContentTransition';
import { propsMap } from 'react-steersman-transition/Transition';
import { routePropTypes, routeDefaultProps, routeEventsDefaultProps } from './propTypes';

export default class Route extends Component {

  static propTypes = routePropTypes;

  static defaultProps = routeDefaultProps;

  static contextTypes = {
    transitionTimeout: number.isRequired,
    isMounted: func.isRequired,
    mapProps: func,
    ...routeEventsDefaultProps,
  };

  onTransition = async args => {
    const { direction, status } = args;
    const event = propsMap[direction][status];
    await this.props[event](args);
    await this.context[event](args);
    await this.context.onUpdated(args);
  };

  mapProps = (match) => {
    return (direction, status) => {
      const { mapProps: defaultMapProps } = this.context;
      const { mapProps = defaultMapProps } = this.props;

      return {
        ...mapProps(direction, status),
        match,
      };
    };
  };

  render() {
    const { isMounted, transitionTimeout: defaultTimeout } = this.context;
    const { path, exact, strict, transitionTimeout = defaultTimeout, props, children } = this.props;

    return (
      <Match
        path={path}
        exact={exact}
        strict={strict}
        props={props}
        children={match => (
          <ContentTransition
            children={children}
            timeout={transitionTimeout}
            display={!!match.match}
            props={match}
            mapProps={this.mapProps(match)}
            onEnter={this.onTransition}
            onEntering={this.onTransition}
            onEntered={this.onTransition}
            onExit={this.onTransition}
            onExiting={this.onTransition}
            onExited={this.onTransition}
            startOnMount={isMounted()}
          />
        )}
      />
    );
  }
}
