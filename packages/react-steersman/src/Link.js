import React, { Component } from 'react';
import { object } from 'prop-types';
import Match from './Match';
import { linkPropTypes, linkDefaultProps, isReactNative } from './propTypes';

export default class Link extends Component {
  static propTypes = linkPropTypes;

  static defaultProps = linkDefaultProps;

  static contextTypes = {
    history: object.isRequired,
  };

  navigate = (event) => {
    const { history } = this.context;
    const { onPress, onClick } = this.props;
    if (history.location.pathname !== this.props.to) {
      history.push(this.props.to);
    }
    if (isReactNative) {
      onPress(event);
    } else {
      event.preventDefault();
      onClick(event);
    }
  };

  render() {
    const {
            component: Component,
            to,
            exact,
            strict,
            style,
            activeStyle,
            className,
            activeClassName,
            title,
            ...props
          } = this.props;

    const componentProps = match => ({
      match,
      ...(isReactNative
          ? {
            style: [style, match && activeStyle],
            onPress: this.navigate,
            title,
          }
          : {
            href: to,
            style: {
              ...style,
              ...(match ? activeStyle : {}),
            },
            className: [className, match && activeClassName].filter(Boolean).join(' '),
            onClick: this.navigate,
            children: title,
          }
      ),
    });

    return <Match
      path={to}
      exact={exact}
      strict={strict}
      children={({ match }) => (
        <Component
          {...props}
          {...componentProps(match)}
        />
      )}
    />;
  }
}
