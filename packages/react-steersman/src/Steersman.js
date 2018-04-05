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

export const Context = SteersmanContext.Consumer;

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
