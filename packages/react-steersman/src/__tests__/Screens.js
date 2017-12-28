import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import Screens from '../Screens';

test('Screens', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Screens
        screens={{
          '/': (args) => console.log(args) || 'screen1',
          '/2': () => 'screen2',
          '/3': () => 'screen3',
        }}
      />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('screen1');
});
