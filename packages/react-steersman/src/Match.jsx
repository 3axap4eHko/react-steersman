import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Pattern from '@react-steersman/url/Pattern';

export default class Match extends Component {

  static propTypes = {
    to: string,
  };

  static defaultProps = {
    to: '/',
  };

  static contextTypes = {
    history: object,
  };

  pattern = new Pattern(this.props.to);

  state = {
    match: this.pattern.match(this.context.location.pathname),
  };

  componentWillMount() {
    const { history } = this.context;
    this.unlisten = history.listen((location) => {
      const match = this.pattern.match(location.pathname);
      this.setState({ match });
    });
  }

  componentWillReceiveProps({ to }) {
    this.pattern = new Pattern(to);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;
    const { match } = this.state;

    return children(match);
  }
}
