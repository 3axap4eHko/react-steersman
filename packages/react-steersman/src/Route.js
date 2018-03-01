import React, { Component } from 'react';
import { number, string, object, func } from 'prop-types';
import ContentTransition from 'react-transistor/ContentTransition';
import { propsMap } from 'react-transistor/Transition';
import { routePropTypes, routeDefaultProps, routeEventsDefaultProps } from './props';
import Match from './Match';

export default class Route extends Component {

  static propTypes = routePropTypes;

  static defaultProps = routeDefaultProps;

  static contextTypes = {
    isMounted: func.isRequired,
    transitionTimeout: number.isRequired,
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

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    const { isMounted, transitionTimeout: defaultTimeout, mapProps: defaultMapProps } = this.context;
    const { matcher, path, exact, strict, transitionTimeout = defaultTimeout, mapProps = defaultMapProps, props, children, ...matcherProps } = this.props;
    const Matcher = matcher || Match;

    return (
      <Matcher
        path={path}
        exact={exact}
        strict={strict}
        props={props}
        {...matcherProps}
        children={match => (
          <ContentTransition
            children={children}
            timeout={transitionTimeout}
            display={!!match.match}
            props={match}
            mapProps={mapProps}
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
