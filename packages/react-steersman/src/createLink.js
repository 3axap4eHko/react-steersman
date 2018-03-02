import React, { Component } from 'react';
import { string, number, func, object, bool, oneOfType } from 'prop-types';
import Match from './Match';
import navigateTo from './navigateTo';

export default function createLink(render) {

  return class Link extends Component {
    static propTypes = {
      to: oneOfType([string, number]).isRequired,
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
      navigateTo(history, to);
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
