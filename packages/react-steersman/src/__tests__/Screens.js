import React from 'react';
import renderer from 'react-test-renderer';
import { DIRECTION_ENTER, DIRECTION_EXIT, STATUS_DONE, STATUS_ACTIVE, STATUS_START } from 'react-steersman-transition/constants';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import Screens from '../Screens';

test('Screens', done => {
  const context = { counter: 0 };
  const history = createMemoryHistory();

  function testCase(args) {
    context.counter++;
    if (!context.test) {
      context.test = true;
      history.push('/test');
    }
    if (context.counter === 7) {
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
      <Screens
        screens={{
          '/': ({ direction, status }) => `screen:${direction}:${status}`,
          '/test': ({ direction, status }) => `test-screen:${direction}:${status}`,
        }}
      />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(`screen:${DIRECTION_ENTER}:${STATUS_DONE}`);
});
