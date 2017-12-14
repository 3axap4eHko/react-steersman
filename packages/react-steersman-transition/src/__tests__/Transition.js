import React from 'react';
import renderer from 'react-test-renderer';
import Transition from '../Transition';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_INIT, STATUS_DOING, STATUS_DONE } from '../constants';

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

test('Transition init state', () => {
  const component = renderer.create(
    <Transition timeout={NO_TIMEOUT}>
      {({ direction, status }) => `${direction}:${status}`}
    </Transition>,
  );
  let tree = component.toJSON();
  expect(tree).toBe(`${DIRECTION_ENTER}:${STATUS_DONE}`);
});

test('Transition enter', () => {
  const context = {};

  function noExecution() {
    expect(() => {throw new Error;}).not.toThrowError();
  }

  context.component = renderer.create(
    <Transition timeout={NO_TIMEOUT} direction={DIRECTION_ENTER} onEnter={noExecution} onEntering={noExecution} onEntered={noExecution}>
      {({ direction, status }) => `${direction}:${status}`}
    </Transition>,
  );
  expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_DONE}`);
});

test('Transition enter startOnMount', done => {
  const context = {};

  function onEnter() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_INIT}`);
    context.time = Date.now();
  }

  function onEntering() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_DOING}`);
  }

  function onEntered() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_DONE}`);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition timeout={TIMEOUT} direction={DIRECTION_ENTER} onEnter={onEnter} onEntering={onEntering} onEntered={onEntered} startOnMount>
      {({ direction, status }) => `${direction}:${status}`}
    </Transition>,
  );

  expect(context.component.toJSON()).toBe(`${DIRECTION_ENTER}:${STATUS_INIT}`);
});

test('Transition exit', () => {
  const context = {};

  function noExecution() {
    expect(() => {throw new Error;}).not.toThrowError();
  }

  context.component = renderer.create(
    <Transition timeout={NO_TIMEOUT} direction={DIRECTION_EXIT} onEnter={noExecution} onEntering={noExecution} onEntered={noExecution}>
      {({ direction, status }) => `${direction}:${status}`}
    </Transition>,
  );
  expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_DONE}`);
});

test('Transition exit startOnMount', done => {
  const context = {};

  function onExit() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_INIT}`);
    context.time = Date.now();
  }

  function onExiting() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_DOING}`);
    context.time = Date.now();
  }

  function onExited() {
    expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_DONE}`);
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition timeout={TIMEOUT} direction={DIRECTION_EXIT} onExit={onExit} onExiting={onExiting} onExited={onExited} startOnMount>
      {({ direction, status }) => `${direction}:${status}`}
    </Transition>,
  );

  expect(context.component.toJSON()).toBe(`${DIRECTION_EXIT}:${STATUS_INIT}`);
});
