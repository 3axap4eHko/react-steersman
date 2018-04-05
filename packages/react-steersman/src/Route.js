import React, { Component } from 'react';
import { number, string, object, func } from 'prop-types';
import ContentTransition from 'react-transistor/ContentTransition';
import { propsMap } from 'react-transistor/Transition';
import { routePropTypes, routeDefaultProps } from './props';
import { withContext } from './Steersman';
import Match from './Match';

@withContext()
export default class Route extends Component {

  static propTypes = routePropTypes;

  static defaultProps = routeDefaultProps;

  onTransition = async args => {
    const { direction, status } = args;
    const event = propsMap[direction][status];
    const { steersman, [event]: eventProp } = this.props;
    await eventProp(args);
    await steersman[event](args);
    await steersman.onUpdated(args);
  };

  render() {
    const { isMounted, transitionTimeout: defaultTimeout, mapProps: defaultMapProps } = this.props.steersman;
    const { matcher, path, exact, strict, transitionTimeout = defaultTimeout, mapProps = defaultMapProps, props, children, group, ...matcherProps } = this.props;
    const Matcher = matcher || Match;

    return (
      <Matcher
        path={path}
        exact={exact}
        strict={strict}
        props={props}
        group={group}
        {...matcherProps}
        children={matchProps => (
          <ContentTransition
            children={children}
            timeout={transitionTimeout}
            display={!!matchProps.match}
            props={matchProps}
            mapProps={mapProps}
            onEnter={this.onTransition}
            onEntering={this.onTransition}
            onEntered={this.onTransition}
            onExit={this.onTransition}
            onExiting={this.onTransition}
            onExited={this.onTransition}
            startOnMount={isMounted()}
            freezePropsOnExit={true}
          />
        )}
      />
    );
  }
}
