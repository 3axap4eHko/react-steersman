import React, { Component } from 'react';
import { number } from 'prop-types';
import renderer from 'react-test-renderer';
import GroupTransition from '../GroupTransition';
import Transition from '../Transition';

const NO_TIMEOUT = 0;
const TIMEOUT = 1000;

class Wrapper extends Component {

  static propTypes = {
    initSize: number,
  };

  state = {
    items: Array.from({ length: this.props.initSize }).map((v, idx) => idx),
  };

  onRemove = (value) => {
    const { items } = this.state;
    const index = items.indexOf(value);
    items.splice(index, 1);
    this.setState({ items: items.slice() });
  };

  onAdd = (value) => {
    this.setState({ items: this.state.items.concat([value]) });
  };

  render() {
    const { items } = this.state;
    const { onUpdated, onExit, onExited } = this.props;
    return (
      <GroupTransition onUpdated={onUpdated}>
        {items.map(id => <Transition key={id} timeout={NO_TIMEOUT} onExit={onExit} onExited={onExited}>{status => status}</Transition>)}
      </GroupTransition>
    );
  }
}

test('GroupTransition', done => {
  const context = {};
  const initSize = 10;

  function onUpdated() {
    const resultState = context.component.toJSON();
    expect(resultState.length).toBe(initSize - 1);
    expect(context.exited).toBeTruthy();
    done();
  }

  function onExited() {
    context.exited = true;
  }

  function onExit() {
    const pendingState = context.component.toJSON();
    expect(pendingState.length).toBe(initSize);
    expect(pendingState[initSize - 1]).toBe('exiting');
  }

  context.component = renderer.create(<Wrapper initSize={initSize} onUpdated={onUpdated} onExit={onExit} onExited={onExited} />);
  context.tree = context.component.toTree();

  const initialState = context.component.toJSON();
  expect(initialState.length).toBe(initSize);
  expect(initialState[initSize - 1]).toBe('none');
  context.tree.instance.onRemove(initSize - 1);
});
