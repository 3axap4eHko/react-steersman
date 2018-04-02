import React, { Component } from 'react';
import { steersmanDefaultProps, steersmanPropTypes } from './props';

const SteersmanContext = React.createContext(steersmanDefaultProps);

export default class Steersman extends Component {

  static propTypes = steersmanPropTypes;

  static defaultProps = steersmanDefaultProps;

  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <SteersmanContext.Provider value={{ ...props, isMounted: () => this.mounted }}>
        {children}
      </SteersmanContext.Provider>
    );
  }
}

export function withContext(WrappedComponent) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  return class Context extends Component {
    static displayName = `Context(${componentName})`;
    static WrappedComponent = WrappedComponent;

    render() {
      return (
        <SteersmanContext.Consumer>
          {steersman => <WrappedComponent {...this.props} steersman={steersman} />}
        </SteersmanContext.Consumer>
      );
    }
  };
}
