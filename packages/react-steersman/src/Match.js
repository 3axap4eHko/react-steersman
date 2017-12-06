import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Pattern from 'react-steersman-url/Pattern';

export default class Match extends Component {

  static propTypes = {
    path: string,
    exact: bool,
    strict: bool,
  };

  static defaultProps = {
    path: '/',
    exact: true,
    strict: false,
  };

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
      pathname: history.location.pathname,
      match: this.pattern.match(history.location.pathname),
      timestamp: Date.now(),
    };

    this.unlisten = history.listen(location => {
      const match = this.pattern.match(location.pathname);
      if (JSON.stringify(this.state.match) !== JSON.stringify(match)) {
        this.setState({
          match,
          timestamp: Date.now(),
          pathname: location.pathname,
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
    const { children } = this.props;
    const { match, pathname } = this.state;

    return children({ match, pathname });
  }
}
