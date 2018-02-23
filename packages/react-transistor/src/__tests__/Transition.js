import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import Transition from '../Transition';
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

function noExecution() {
  expect(() => {throw new Error;}).not.toThrowError();
}

class NullRender extends Component {
  render() {
    return null;
  }
}

function nullRender(props) {
  expect(props.mappedProp).toMatch(/^(\w+)-(\w+)$/);
  return null;
}

function propsMapper(props) {
  return { ...props, mappedProp: `${props.direction}-${props.status}` };
}

test('Transition init state stateless', () => {

  const component = renderer.create(
    <Transition
      timeout={NO_TIMEOUT}
      children={nullRender}
      mapProps={propsMapper}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toBe(null);
});

test('Transition init state class', () => {

  const component = renderer.create(
    <Transition
      timeout={NO_TIMEOUT}
      children={NullRender}
      mapProps={propsMapper}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toBe(null);
});

test('Transition enter', done => {
  const context = {};

  function onEntered({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_DONE);
    done();
  }

  context.component = renderer.create(
    <Transition
      timeout={NO_TIMEOUT}
      direction={DIRECTION_ENTER}
      mapProps={propsMapper}
      onEnter={noExecution}
      onEntering={noExecution}
      onEntered={onEntered}
      children={nullRender}
      startOnMount
    />,
  );
  expect(context.component.toJSON()).toBe(null);
});

test('Transition enter startOnMount', done => {
  const context = {};

  function onEnter({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_START);
    context.time = Date.now();
  }

  function onEntering({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_ACTIVE);
  }

  function onEntered({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_DONE);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition
      timeout={TIMEOUT}
      direction={DIRECTION_ENTER}
      mapProps={propsMapper}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      children={nullRender}
      startOnMount
    />,
  );
});

test('Transition exit', done => {
  const context = {};

  function onExited({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_DONE);
    done();
  }

  context.component = renderer.create(
    <Transition
      timeout={NO_TIMEOUT}
      direction={DIRECTION_EXIT}
      mapProps={propsMapper}
      onExit={noExecution}
      onExiting={noExecution}
      onExited={onExited}
      children={nullRender}
      startOnMount
    />,
  );
});

test('Transition exit startOnMount', done => {
  const context = {};

  function onExit({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_START);
    context.time = Date.now();
  }

  function onExiting({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_ACTIVE);
  }

  function onExited({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_DONE);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition
      timeout={TIMEOUT}
      direction={DIRECTION_EXIT}
      mapProps={propsMapper}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      children={nullRender}
      startOnMount
    />,
  );
});

class Wrapper extends Component {
  state = {
    direction: DIRECTION_ENTER,
  };

  render() {
    return (
      <Transition
        direction={this.state.direction}
        mapProps={propsMapper}
        {...this.props}
      />
    );
  }
}

test('Transition full', done => {
  const context = {};

  function onEnter({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_START);
    context.time = Date.now();
  }

  function onEntering({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_ACTIVE);
  }

  function onEntered({ direction, status }) {
    expect(direction).toBe(DIRECTION_ENTER);
    expect(status).toBe(STATUS_DONE);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    if (context.fromExit) {
      done();
    } else {
      context.tree.instance.setState({ direction: DIRECTION_EXIT });
    }
  }

  function onExit({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_START);
    context.time = Date.now();
  }

  function onExiting({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_ACTIVE);
  }

  function onExited({ direction, status }) {
    expect(direction).toBe(DIRECTION_EXIT);
    expect(status).toBe(STATUS_DONE);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    context.fromExit = true;
    context.tree.instance.setState({ direction: DIRECTION_ENTER });
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
      children={nullRender}
      startOnMount
    />,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});
