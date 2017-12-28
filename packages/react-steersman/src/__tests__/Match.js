import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import Match from '../Match';

test('Match', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Match path="/" children={() => 'match'} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('match');
});

test('Match multiple', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Match path="/" children={({ match }) => match && '/'} />
      <Match path="/test" children={({ match }) => match && '/test'} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('/');
});

test('Match multiple changed', done => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Match path="/" children={({ match }) => match && '/'} />
      <Match path="/test" children={({ match }) => match && '/test'} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('/');

  history.listen(() => {
    expect(context.component.toJSON()).toBe('/test');
    done();
  });

  history.push('/test');

});
