import React, { Component } from 'react';
import { string, number, func, object, bool, oneOfType } from 'prop-types';
import { withContext } from './Steersman';
import Match from './Match';
import navigateTo from './navigateTo';

class Link extends Component {
  static propTypes = {
    to: oneOfType([string, number]).isRequired,
    exact: bool,
    strict: bool,
    steersman: object.isRequired,
  };

  navigate = event => {
    const { steersman, to } = this.props;
    if (event.preventDefault) {
      event.preventDefault();
    }
    navigateTo(steersman.history, to);
  };

  render() {
    const { to, exact, strict, ...props } = this.props;

    return (
      <Match
        path={to}
        exact={exact}
        strict={strict}
      >
        {({ match }) => this.props.render({
          to,
          active: !!match,
          navigate: this.navigate,
          ...props,
        })}
      </Match>
    );
  }
}

export default function createLink(render) {
  return withContext({ props: { render } })(Link);
}
