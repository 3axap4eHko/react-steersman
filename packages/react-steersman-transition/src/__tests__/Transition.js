import React from 'react';
import renderer from 'react-test-renderer';
import Transition, { STATUS_NONE, STATUS_ENTER, STATUS_EXIT } from '../Transition';

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

test('Transition none', () => {
  const component = renderer.create(
    <Transition timeout={NO_TIMEOUT}>
      {status => status}
    </Transition>,
  );
  let tree = component.toJSON();
  expect(tree).toBe(STATUS_NONE);
  expect(component.toJSON()).toBe('none');
});

test('Transition enter', done => {
  const context = {};

  function onEnter() {
    expect(context.component.toJSON()).toBe('entering');
    context.time = Date.now();
  }

  function onEntered() {
    expect(context.component.toJSON()).toBe('entered');
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition timeout={TIMEOUT} status={STATUS_ENTER} onEnter={onEnter} onEntered={onEntered}>
      {status => status}
    </Transition>,
  );

  expect(context.component.toJSON()).toBe('entering');
});

test('Transition exit', done => {
  const context = {};

  function onExit() {
    expect(context.component.toJSON()).toBe('exiting');
    context.time = Date.now();
  }

  function onExited() {
    expect(context.component.toJSON()).toBe('exited');
    expect(Date.now() - context.time).toBeAroundTo(TIMEOUT);
    done();
  }

  context.component = renderer.create(
    <Transition timeout={TIMEOUT} status={STATUS_EXIT} onExit={onExit} onExited={onExited}>
      {status => status}
    </Transition>,
  );

  expect(context.component.toJSON()).toBe('exiting');
});
