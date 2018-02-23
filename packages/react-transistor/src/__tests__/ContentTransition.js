import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import ContentTransition from '../ContentTransition';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_START, STATUS_ACTIVE, STATUS_DONE } from '../constants';

const NO_TIMEOUT = 0;
const TIMEOUT = 1000;

expect.extend({
  toBeAroundTo(received, argument, digits = 2) {
    const pass = Math.abs(received - argument) < Math.pow(10, argument.toString().length / digits);
    return {
      message: () => `expected ${received} to be around to ${argument}`,
      pass,
    };
  },
});

function propsMapper(props) {
  return { children: `${props.direction}:${props.status}` };
}

class Wrapper extends Component {
  state = {
    display: false,
  };

  render() {
    const { ...props } = this.props;
    return (
      <ContentTransition
        {...props}
        display={this.state.display}
        mapProps={propsMapper}
        children={({ children }) => children}
      />
    );
  }
}

test('ContentTransition init state', () => {
  const context = {};
  context.component = renderer.create(
    <Wrapper
      timeout={NO_TIMEOUT}
    />,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  context.tree.instance.setState({ display: true });
  expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_DONE}`);
});

test('ContentTransition startOnMount', done => {
  const context = {};

  function onEnter() {
    context.time = Date.now();
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_START}`);
  }

  function onEntering() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_ACTIVE}`);
  }

  function onEntered() {
    const elapsed = Date.now() - context.time;
    expect(elapsed).toBeAroundTo(TIMEOUT);
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_DONE}`);
    if (context.fromExit) {
      done();
    } else {
      context.tree.instance.setState({ display: false });
    }
  }

  function onExit() {
    context.time = Date.now();
    expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_START}`);
  }

  function onExiting() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_ACTIVE}`);
  }

  function onExited() {
    const elapsed = Date.now() - context.time;
    expect(elapsed).toBeAroundTo(TIMEOUT);
    expect(context.component.toJSON()).toBe(null);
    context.fromExit = true;
    context.tree.instance.setState({ display: true });
  }

  context.component = renderer.create(
    <Wrapper
      timeout={TIMEOUT}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      startOnMount
    />,
  );
  context.tree = context.component.toTree();
  context.tree.instance.setState({ display: true });
  expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_START}`);
});
