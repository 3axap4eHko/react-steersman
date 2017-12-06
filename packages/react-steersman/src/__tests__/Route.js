import React from 'react';
import renderer from 'react-test-renderer';
import Transition from '../../../react-steersman-transition/src/Transition';
import createMemoryHistory from '../createMemoryHistory';
import Route from '../Route';
import Steersman from '../Steersman';

function TestTransition({ children, ...props }) {
  return (
    <Transition {...props} timeout={500}>
      {transition => children(transition)}
    </Transition>
  );
}

test('Steersman onRouteUpdated', done => {
  const context = {};
  const history = createMemoryHistory();

  function onUpdated({ match, pathname }) {
    expect(match).toBe(null);
    expect(pathname).toBe('/test');
    done();
  }

  context.component = renderer.create(
    <Steersman history={history} onRouteUpdated={onUpdated}>
      <Route path="/" render={() => null} />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  history.push('/test');
});

test.only('Route matched path', done => {
  const context = {
    counter: 0,
    events: {},
  };
  const history = createMemoryHistory();

  function testCase(event) {
    return () => {
      context.counter += 1;
      context.events[event] = (context.events[event] || 0) + 1;
      if (context.counter === 6) {
        expect(context.events.enter).toBe(1);
        expect(context.events.entering).toBe(1);
        expect(context.events.entered).toBe(1);
        expect(context.events.exit).toBe(1);
        expect(context.events.exiting).toBe(1);
        expect(context.events.exited).toBe(1);
        done();
      }
    };
  }

  context.component = renderer.create(
    <Steersman
      history={history}
      onRouteEnter={testCase('enter')}
      onRouteEntering={testCase('entering')}
      onRouteEntered={testCase('entered')}
      onRouteExit={testCase('exit')}
      onRouteExiting={testCase('exiting')}
      onRouteExited={testCase('exited')}
    >
      <Route transition={TestTransition} path="/" render={({ match, direction, status }) => `route-${direction}-${status}`} />
      <Route transition={TestTransition} path="/test" render={({ match, direction, status }) => `route-test-${direction}-${status}`} />
    </Steersman>,
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('route-enter-done');
  setTimeout(() => history.push('/test'), 1000);
});

