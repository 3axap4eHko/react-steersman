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

  history.push('/test');
  expect(context.component.toJSON()).toBe('/test');
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

function renderMatch({ match, }) {
  return JSON.stringify(match);
}

test('Match group', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Match path="/" children={renderMatch} group="test" />
      <Match path="/test1" children={renderMatch} group="test" />
      <Match path="/test2" children={renderMatch}  group="test" />
      <Match path=".*" children={renderMatch}  group="test" />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toMatchObject(["{}", "null", "null", "null"]);
  history.push('/test1');
  expect(context.component.toJSON()).toMatchObject(["null", "{}", "null", "null"]);
  history.push('/test2');
  expect(context.component.toJSON()).toMatchObject(["null", "null", "{}", "null"]);
  history.push('/test3');
  expect(context.component.toJSON()).toMatchObject(["null", "null", "null", "{}"]);
  history.push('/');
  expect(context.component.toJSON()).toMatchObject(["{}", "null", "null", "null"]);
});
