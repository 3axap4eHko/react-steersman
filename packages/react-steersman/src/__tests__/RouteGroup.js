import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import RouteGroup from '../RouteGroup';
import Steersman from '../Steersman';

function mapProps(props) {
  const { direction, status } = props;
  return {
    mapped: `${direction}-${status}`,
    ...props,
  };
}

function render({ value }) {
  return value;
}

const TIMEOUT = 500;

test('Steersman render single route group', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps} transitionTimeout={200}>
      <RouteGroup path="/" children={render} props={{ value: 1 }} />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('1');
  history.push('/test1');
  await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  expect(context.component.toJSON()).toBe(null);
});

test('Steersman render route group', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps} transitionTimeout={200}>
      <RouteGroup path="/" children={render} props={{ value: 1 }} />
      <RouteGroup path=".*" children={render} props={{ value: 0 }} />
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
