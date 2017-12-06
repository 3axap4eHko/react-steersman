import React, { Component, Children, cloneElement } from 'react';
import { func, arrayOf, oneOfType } from 'prop-types';

function mapChildren(nextChildren, prevChildren = [], onExited) {
  const children = nextChildren.reduce((result, child, idx) => ({ ...result, [child.key]: { idx, child } }), {});
  prevChildren.forEach((child, idx) => {
    if (!children[child.key]) {
      children[child.key] = {
        idx,
        child: cloneElement(child, {
          direction: 'exit',
          force: Date.now() + Math.random(),
          onExited: () => onExited(child.key, child.props.onExited),
        }),
      };
    }
  });
  return Object.values(children).sort((a, b) => a.idx - b.idx).map(({ child }) => child);
}

const nop = () => {};

export default class GroupTransition extends Component {

  static propTypes = {
    onUpdated: func,
  };

  static defaultProps = {
    onUpdated: nop,
  };

  state = {
    children: mapChildren(Children.toArray(this.props.children), [], this.onExited),
  };

  setStateAsync = state => {
    return new Promise((resolve) => this.setState(state, resolve));
  };

  onExited = async (childKey, onExited) => {
    onExited();
    const children = this.state.children.slice();
    const deleteIndex = children.findIndex(child => child.key === childKey);
    children.splice(deleteIndex, 1);
    await this.setStateAsync({ children });
    this.props.onUpdated();
  };

  async componentWillReceiveProps(nextProps) {
    const children = mapChildren(Children.toArray(nextProps.children), this.state.children, this.onExited);
    await this.setStateAsync({ children });
  }

  render() {
    return [...this.state.children];
  }
}
