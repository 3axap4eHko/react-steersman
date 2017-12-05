import React, { Component, Children, cloneElement } from 'react';
import { func, arrayOf, oneOfType } from 'prop-types';

function mapChildren(nextChildren, prevChildren = [], onExited) {
  const children = nextChildren.reduce((result, child, idx) => ({ ...result, [child.key]: { idx, child } }), {});
  prevChildren.forEach((child, idx) => {
    if (!children[child.key]) {
      children[child.key] = {
        idx,
        child: cloneElement(child, {
          status: 'exit',
          onExited: () => onExited(child.key, child.props.onExited),
        }),
      };
    }
  });
  return Object.values(children).sort((a, b) => a.idx - b.idx).map(({ child }) => child);
}

export default class GroupTransition extends Component {

  static propTypes = {
    onUpdated: func,
  };

  static defaultProps = {
    onUpdated() {},
  };

  state = {
    children: mapChildren(Children.toArray(this.props.children), [], this.onExited),
  };

  onExited = (childKey, onExited) => {
    onExited();
    const children = this.state.children.slice();
    const deleteIndex = children.findIndex(child => child.key === childKey);
    children.splice(deleteIndex, 1);
    this.setState({ children });
    this.props.onUpdated();
  };

  componentWillReceiveProps(nextProps) {
    const children = mapChildren(Children.toArray(nextProps.children), this.state.children, this.onExited);
    this.setState({ children });
  }

  render() {
    return [...this.state.children];
  }
}
