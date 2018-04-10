import React, { Component } from 'react';
import { func } from 'prop-types';
import { steersmanDefaultProps, steersmanPropTypes } from './props';

export default class Steersman extends Component {

  static propTypes = steersmanPropTypes;

  static defaultProps = steersmanDefaultProps;

  static childContextTypes = {
    isMounted: func,
    ...steersmanPropTypes,
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

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

  render() {
    const { children } = this.props;
    return children;
  }
}

export class Context extends Component {
  static propTypes = {
    children: func.isRequired,
  };

  static contextTypes = {
    isMounted: func,
    ...steersmanPropTypes,
  };

  render() {
    const { children } = this.props;
    return children(this.context);
  }
}

export function withContext(options) {

  const { props } = options || {};

  return WrappedComponent => {

    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class SteersmanContext extends Component {
      static displayName = `Steersman(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render() {
        return (
          <Context>
            {steersman => <WrappedComponent {...props} {...this.props} steersman={steersman} />}
          </Context>
        );
      }
    };
  };
}
