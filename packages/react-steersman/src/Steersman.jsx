import React, { Component } from 'react';
import { object, func } from 'prop-types';

export default class Steersman extends Component {

  static propTypes = {
    onLocationChanged: func,
    onRouteUpdated: func,
    history: object.isRequired,
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
