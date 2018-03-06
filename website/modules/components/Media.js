import React, { Component } from 'react';
import { object, array, func, oneOfType } from 'prop-types';

function isSize(key) {
  return /(height|width)/.test(key);
}

function normalize(key) {
  return (key[0].toLowerCase() + key.slice(1).replace(/[A-Z]/g, '-$&').toLowerCase()).replace('only-', 'only ');
}

export function queryToMQ(...queries) {
  return queries.map(query => {
    if (typeof query === 'string') {
      return query;
    }
    return Object.entries(query).map(([key, value]) => {
      if (typeof value === 'boolean') {
        if (value) {
          return normalize(key);
        }
        return false;
      }
      if (isSize(key) && typeof value === 'number') {
        value += 'px';
      }
      return `(${normalize(key)}: ${value})`;

    }).filter(Boolean).join(' and ');
  }).join(', ');
}

export default class Media extends Component {
  static propTypes = {
    query: oneOfType([object, array]).isRequired,
    targetWindow: func,
  };

  static defaultProps = {
    targetWindow: () => typeof window !== 'undefined' ? window : null,
  };

  state = {
    matches: false,
  };

  onMatch = ({ matches }) => {
    this.setState({ matches });
  };

  componentWillMount() {
    const target = this.props.targetWindow();
    if (target) {
      const mediaQuery = queryToMQ(this.props.query);
      this.mql = target.matchMedia(mediaQuery);
      this.mql.addListener(this.onMatch);
      this.onMatch({ matches: this.mql.matches });
    }
  }

  componentWillUnmount() {
    this.mql.removeListener(this.onMatch);
  }

  render() {
    const { children } = this.props;
    const { matches } = this.state;
    return matches ? children() : null;
  }
}
