import React, { Component } from 'react';
import { string, func, object, bool } from 'prop-types';
import Match from './Match';

export default function createLink(render) {

  return class Link extends Component {
    static propTypes = {
      to: string.isRequired,
      exact: bool,
      strict: bool,
    };

    static contextTypes = {
      history: object,
    };

    navigate = event => {
      const { history } = this.context;
      const { to } = this.props;
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (history.location.pathname !== to) {
        history.push(to);
      }
    };

    render() {
      return (
        <Match
          path={this.props.to}
          exact={this.props.exact}
          strict={this.props.strict}
          props={{
            ...this.props,
            navigate: this.navigate,
          }}
        >
          {match => render(match)}
        </Match>
      );
    }
  };
}
