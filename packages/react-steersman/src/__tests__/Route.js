import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_START, STATUS_ACTIVE, STATUS_DONE } from 'react-steersman-transition/constants';
import createMemoryHistory from '../createMemoryHistory';
import Route from '../Route';
import Steersman from '../Steersman';

test('Steersman render route', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Route path="/" children={() => 'test'} />
      <Route path="/test" children={() => 'not test'} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('test');
});

test('Steersman onRouteUpdated', done => {
  const context = {};
  const history = createMemoryHistory();

  function onExited({ match, location, path }) {
    expect(match).toBe(null);
    expect(location).not.toBe(path);
    history.push('/test');
  }

  function onEnter({ match, location, path }) {
    expect(match).not.toBe(null);
    expect(location).toBe(path);
  }

  function onEntered({ match, location, path }) {
    expect(match).not.toBe(null);
    expect(location).toBe(path);
    done();
  }

  context.component = renderer.create(
    <Steersman history={history} onEnter={onEnter} onEntered={onEntered} onExited={onExited}>
      <Route path="/" children={() => null} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});

test('Route matched path', done => {
  const context = {
    counter: 0,
    events: {},
  };
  const history = createMemoryHistory();

  function testCase({ direction, status }) {
    context.counter += 1;
    context.events[direction + status] = (context.events[direction + status] || 0) + 1;
    if (context.counter === 6) {
      expect(context.events[DIRECTION_ENTER + STATUS_START]).toBe(1);
      expect(context.events[DIRECTION_ENTER + STATUS_ACTIVE]).toBe(1);
      expect(context.events[DIRECTION_ENTER + STATUS_DONE]).toBe(1);
      expect(context.events[DIRECTION_EXIT + STATUS_START]).toBe(1);
      expect(context.events[DIRECTION_EXIT + STATUS_ACTIVE]).toBe(1);
      expect(context.events[DIRECTION_EXIT + STATUS_DONE]).toBe(1);
      done();
    }
  }

  context.component = renderer.create(
    <Steersman
      history={history}
      transitionTimeout={100}
      onEnter={testCase}
      onEntering={testCase}
      onEntered={testCase}
      onExit={testCase}
      onExiting={testCase}
      onExited={testCase}
    >
      <Route path="/" children={({ direction, status }) => `route-${direction}-${status}`} />
      <Route path="/test" children={({ direction, status }) => `route-test-${direction}-${status}`} />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(`route-${DIRECTION_ENTER}-${STATUS_DONE}`);
  setTimeout(() => history.push('/test'), 1000);
});

