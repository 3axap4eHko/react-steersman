import React, { Component } from 'react';
import { string, number, func, object, bool, oneOfType } from 'prop-types';
import { withContext } from './Steersman';
import Match from './Match';
import navigateTo from './navigateTo';

@withContext
class SteerLink extends Component {
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
    const { render } = this.props;
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
}

export default function createLink(render) {
  return function Link(props) {
    return <SteerLink {...props} render={render} />;
  };
}
