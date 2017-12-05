import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Route from '../Route';
import Steersman from '../Steersman';

test('Steersman onLocationChanged', done => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history} onLocationChanged={() => done()}>
      {null}
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  history.push('/');
});

test('Route matched path', done => {
  const context = {};
  const history = createMemoryHistory();

  const testCases = {
    '/': [
      () => {
        expect(context.component.toJSON()).toBe('route-none');
        history.push('/test');
      },
      (routePath, match) => {
        if (routePath === '/') {
          expect(match).toMatchObject({});
        } else {
          expect(match).toBe(null);
        }
        expect(context.component.toJSON().length).toBe(2);
      },
      (routePath, match) => {
        if (routePath === '/') {
          expect(match).toMatchObject({});
        } else {
          expect(match).toBe(null);
        }
        expect(context.component.toJSON().length).toBe(2);
      },
      (routePath, match) => {
        expect(routePath).toBe('/test');
        expect(match).toBe(null);
        expect(context.component.toJSON()).toMatch(/route-enter/);
        done();
      },
    ],
    '/test': [
      (routePath, match) => {
        expect(routePath).toBe('/');
        expect(match).toBe(null);
        expect(context.component.toJSON()).toBe('route-exiting');
      },
      (routePath, match) => {
        expect(routePath).toBe('/test');
        expect(match).toMatchObject({});
        expect(context.component.toJSON().length).toBe(2);
      },
      (routePath, match) => {
        expect(routePath).toBe('/');
        expect(match).toBe(null);
        expect(context.component.toJSON()).toMatch(/route-test-enter/);
        history.push('/');
      },
    ],
  };

  function executeCase(routePath, match, pathname) {
    const cases = testCases[pathname];
    if (cases.length) {
      cases.shift()(routePath, match, pathname);
    } else {
      throw new Error('Unexpected call executeCase');
    }
  }

  context.component = renderer.create(
    <Steersman history={history} onRouteUpdated={executeCase}>
      <Route path="/" render={(match, status) => `route-${status}`} />
      <Route path="/test" render={(match, status) => `route-test-${status}`} />
    </Steersman>,
  );

  context.tree = context.component.toTree();

  executeCase(null, null, '/');
});

