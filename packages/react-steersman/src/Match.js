import React, { Component } from 'react';
import { object, string, func, bool, oneOfType } from 'prop-types';
import Pattern from 'uriil/Pattern';
import { matchPropTypes, matchDefaultProps } from './props';
import { withContext } from './Steersman';

const matchedGroups = {};

function getMatches(group, location, match) {
  if (group) {
    if (matchedGroups[group].location !== location) {
      matchedGroups[group] = {
        location,
      };
    }
    const groupMatch = match && !matchedGroups[group].matched ? match : null;
    if (groupMatch) {
      matchedGroups[group].matched = true;
    }
    return groupMatch;
  }
  return match;
}

@withContext()
export default class Match extends Component {

  static propTypes = matchPropTypes;

  static defaultProps = matchDefaultProps;

  constructor(props, context) {
    super(props, context);
    const { steersman } = props;

    if (!steersman) {
      console.error('Make sure your Route has Steersman component at the parent level');
    }
    const { history } = steersman;
    const { group, path, exact, strict } = this.props;

    if (!matchedGroups[group]) {
      matchedGroups[group] = {};
    }

    this.pattern = Pattern.fromString(path, {
      exact,
      strict,
    });

    this.state = {
      location: history.location.pathname,
      match: this.pattern.match(history.location.pathname),
      timestamp: Date.now(),
      method: 'PUSH',
    };

    this.unsubscribeHistory = history.listen((location, method) => {
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
    this.unsubscribeHistory();
  }

  render() {
    const { children: Content, path, exact, props, group } = this.props;
    const { match, location, method } = this.state;
    const matches = getMatches(group, location, match);

    return (
      <Content
        match={matches}
        location={location}
        path={path}
        method={method}
        exact={exact}
        {...props}
      />
    );
  }
}
