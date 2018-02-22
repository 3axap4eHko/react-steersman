import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import MatchGroup from '../MatchGroup';

function renderMatch({ match }) {
  return JSON.stringify(match);
}

test('MatchGroup', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <MatchGroup path="/" children={renderMatch} />
      <MatchGroup path="/test1" children={renderMatch} />
      <MatchGroup path="/test2" children={renderMatch} />
      <MatchGroup path=".*" children={renderMatch} />
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
});
