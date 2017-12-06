import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Transition from '../../../react-steersman-transition/src/Transition';
import Steersman from '../Steersman';
import Match from '../Match';

function DefaultTransition({ children, ...props }) {
  return (
    <Transition {...props} timeout={500}>
      {transition => children(transition)}
    </Transition>
  );
}

test('Match', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Match path="/">{() => 'match'}</Match>
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
      <Match path="/">{({ match }) => match && '/'}</Match>
      <Match path="/test">{({ match }) => match && '/'}</Match>
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
      <Match path="/">{({ match }) => match && '/'}</Match>
      <Match path="/test">{({ match }) => match && '/test'}</Match>
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
