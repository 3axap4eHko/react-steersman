import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Match from './Match';
import { matchGroupPropTypes, matchGroupDefaultProps } from './props';

const matchedGroups = {};

export default class MatchGroup extends Component {
  static propTypes = matchGroupPropTypes;

  static defaultProps = matchGroupDefaultProps;

  componentWillMount() {
    const { group } = this.props;
    if (!matchedGroups[group]) {
      matchedGroups[group] = {};
    }
  }

  renderMatchGroup = (groupMatch) => {
    const { group, children } = this.props;
    const { location } = groupMatch;

    if (matchedGroups[group].location !== location) {
      matchedGroups[group] = {
        location,
      };
    }
    const match = groupMatch.match && !matchedGroups[group].matched ? groupMatch.match : null;

    if (match) {
      matchedGroups[group].matched = true;
    }
    const props = { ...groupMatch, match };
    return children(props);
  };

  render() {
    const { path, exact, props } = this.props;

    return (
      <Match
        path={path}
        exact={exact}
        props={props}
        children={this.renderMatchGroup}
      />
    );
  }
}
