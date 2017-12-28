import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Pattern from 'react-steersman-url/Pattern';
import { matchPropTypes, matchDefaultProps } from './propTypes';

export default class Match extends Component {

  static propTypes = matchPropTypes;

  static defaultProps = matchDefaultProps;

  static contextTypes = {
    history: object,
  };

  constructor(props, context) {
    super(props, context);
    if (!context.history) {
      console.error('Make sure your Route has Steersman component at a parent level');
    }
    const { history } = context;

    this.pattern = Pattern.fromString(props.path, {
      exact: props.exact,
      strict: props.strict,
    });

    this.state = {
      location: history.location.pathname,
      match: this.pattern.match(history.location.pathname),
      timestamp: Date.now(),
    };

    this.unlisten = history.listen(location => {
      const match = this.pattern.match(location.pathname);
      if (JSON.stringify(this.state.match) !== JSON.stringify(match)) {
        this.setState({
          match,
          timestamp: Date.now(),
          location: location.pathname,
        });
      }
    });
  }

  componentWillReceiveProps({ path, exact, strict }) {
    this.pattern = Pattern.fromString(path, {
      exact,
      strict,
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children: Content, path, exact, props } = this.props;
    const { match, location } = this.state;

    return (
      <Content
        match={match}
        location={location}
        path={path}
        exact={exact}
        {...props}
      />
    );
  }
}
