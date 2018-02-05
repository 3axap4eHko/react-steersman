import React, { Component } from 'react';
import { number, bool, object, func, oneOf } from 'prop-types';
import { steersmanPropTypes, steersmanDefaultProps } from './props';

export default class Steersman extends Component {

  static propTypes = steersmanPropTypes;

  static defaultProps = steersmanDefaultProps;

  static childContextTypes = {
    isMounted: func,
    ...steersmanPropTypes,
  };

  mounted = false;

  getChildContext() {
    return {
      isMounted: () => this.mounted,
      history: this.props.history,
      transitionTimeout: this.props.transitionTimeout,
      mapProps: this.props.mapProps,
      onUpdated: this.props.onUpdated,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
