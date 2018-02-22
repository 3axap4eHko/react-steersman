import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Pattern from 'uriil/Pattern';
import { matchPropTypes, matchDefaultProps } from './props';

export default class Match extends Component {

  static propTypes = matchPropTypes;

  static defaultProps = matchDefaultProps;

  static contextTypes = {
    history: object,
  };

  constructor(props, context) {
    super(props, context);
    const { history } = context;

    if (!history) {
      console.error('Make sure your Route has Steersman component at a parent level');
    }

    this.pattern = Pattern.fromString(props.path, {
      exact: props.exact,
      strict: props.strict,
    });

    this.state = {
      location: history.location.pathname,
      match: this.pattern.match(history.location.pathname),
      timestamp: Date.now(),
      method: 'PUSH',
    };

    this.unlisten = history.listen((location, method) => {
      const match = this.pattern.match(location.pathname);
      this.setState({
        match,
        timestamp: Date.now(),
        location: location.pathname,
        method,
      });
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
    const { match, location, method } = this.state;

    return (
      <Content
        match={match}
        location={location}
        path={path}
        method={method}
        exact={exact}
        {...props}
      />
    );
  }
}
