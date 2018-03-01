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

test('Steersman render route group', async () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} mapProps={mapProps}>
      <RouteGroup path="/" children={render} props={{ value: 1 }} />
      <RouteGroup path="/test1" children={render} props={{ value: 2 }} />
      <RouteGroup path="/test2" children={render} props={{ value: 3 }} />
      <RouteGroup path="/test3" children={render} props={{ value: 4 }} />
      <RouteGroup path="/test4" children={render} props={{ value: 5 }} />
      <RouteGroup path=".*" children={render} props={{ value: 6 }} />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('1');
  history.push('/test1');
  await new Promise(resolve => setTimeout(resolve, 1));
  expect(context.component.toJSON()).toBe('2');
  history.push('/test4');
  await new Promise(resolve => setTimeout(resolve, 1));
  expect(context.component.toJSON()).toBe('5');
  history.push('/test5');
  await new Promise(resolve => setTimeout(resolve, 1));
  expect(context.component.toJSON()).toBe('6');
});
