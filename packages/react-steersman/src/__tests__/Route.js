import React from 'react';
import renderer from 'react-test-renderer';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_START, STATUS_ACTIVE, STATUS_DONE } from 'react-transistor/constants';
import createMemoryHistory from '../createMemoryHistory';
import createStaticHistory from '../createStaticHistory';
import Route from '../Route';
import Steersman from '../Steersman';

test('Steersman render route', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Route path="/" children={() => 'test' } />
      <Route path="/test" children={() => 'not test'} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('test');
});

test('Steersman mapProps', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={({ direction, status }) => ({ children: `${direction}-${status}` })}>
      <Route path="/" children={({ children }) => `${children}-test`} />
      <Route path="/test" children={({ children }) => `${children}-not-test`} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('enter-done-test');
});

test('Steersman onRouteUpdated', done => {
  const context = {};
  const history = createStaticHistory({ location: '/' });

  function onExited({ match, location, path }) {
    expect(match).toBe(null);
    expect(location).not.toBe(path);
    history.push('/test');
  }

  function onEnter({ match, location, path, method }) {
    expect(match).not.toBe(null);
    expect(location).toBe(path);
    expect(method).toBe('PUSH');
  }

  function onEntered({ match, location, path, method }) {
    expect(match).not.toBe(null);
    expect(location).toBe(path);
    expect(method).toBe('PUSH');
    done();
  }

  context.component = renderer.create(
    <Steersman history={history}>
      <Route path="/" children={() => null} onEnter={onEnter} onEntered={onEntered} onExited={onExited} />
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

function mapProps(props) {
  const { direction, status } = props;
  return {
    mapped: `${direction}-${status}`,
    ...props,
  };
}

function renderRoute({ value }) {
  return value;
}

const TIMEOUT = 500;

test('Route group', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps} transitionTimeout={200}>
      <Route path="/" children={renderRoute} props={{ value: 1 }} group="test" />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('1');
  history.push('/test1');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  expect(context.component.toJSON()).toBe(null);
});

function renderMatchedValue({ match: { value = null }}) {
  return value;
}

test('Route group with null match', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps} transitionTimeout={200}>
      <Route path="/" children={renderMatchedValue} group="test" />
      <Route path="/:value" children={renderMatchedValue} group="test" />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  history.push('/test1');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  expect(context.component.toJSON()).toBe('test1');
});

test('Route group', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps} transitionTimeout={200}>
      <Route path="/" children={renderRoute} props={{ value: 1 }} group="test" />
      <Route path=".*" children={renderRoute} props={{ value: 0 }} group="test" />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('1');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  history.push('/test1');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  expect(context.component.toJSON()).toBe('0');
  history.push('/');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  expect(context.component.toJSON()).toBe('1');
});