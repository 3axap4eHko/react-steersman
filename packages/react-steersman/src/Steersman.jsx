import React, { Component } from 'react';
import { object, func, oneOf } from 'prop-types';

export default class Steersman extends Component {

  static propTypes = {
    history: object.isRequired,
    onLocationChanged: func,
    onRouteUpdated: func,
  };

  static defaultProps = {
    onLocationChanged: () => {},
    onRouteUpdated: () => {},
  };

  static childContextTypes = {
    history: object,
    onRouteUpdated: func,
  };

  onLocationChanged = (location, action) => {
    const { onLocationChanged } = this.props;
    if (onLocationChanged) {
      onLocationChanged(location, action);
    }
  };

  onRouteUpdated = (routePath, match, pathname) => {
    const { onRouteUpdated } = this.props;
    if (onRouteUpdated) {
      onRouteUpdated(routePath, match, pathname);
    }
  };

  getChildContext() {
    return {
      history: this.props.history,
      onRouteUpdated: this.onRouteUpdated,
    };
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(this.onLocationChanged);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
