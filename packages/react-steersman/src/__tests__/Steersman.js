import React, { Component } from 'react';
import { func, object } from 'prop-types';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';

test('Steersman defaults', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      {'defaults'}
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('defaults');
});

test('Steersman events', done => {
  const context = {};
  const history = createMemoryHistory();

  const expectedEvents = {
    'enter': 1,
    'entering': 1,
    'entered': 1,
    'exit': 1,
    'exiting': 1,
    'exited': 1,
    'updated': 1,
  };

  class EventTest extends Component {
    static contextTypes = {
      history: object,
      routeTransition: func,
      onRouteEnter: func,
      onRouteEntering: func,
      onRouteEntered: func,
      onRouteExit: func,
      onRouteExiting: func,
      onRouteExited: func,
      onRouteUpdated: func,
    };

    componentDidMount() {
      const { history, onRouteEnter, onRouteEntering, onRouteEntered, onRouteExit, onRouteExiting, onRouteExited, onRouteUpdated } = this.context;
      expect(typeof history).toBe('object');
      expect(typeof onRouteEnter).toBe('function');
      expect(typeof onRouteEntering).toBe('function');
      expect(typeof onRouteEntered).toBe('function');
      expect(typeof onRouteExit).toBe('function');
      expect(typeof onRouteExiting).toBe('function');
      expect(typeof onRouteExited).toBe('function');
      expect(typeof onRouteUpdated).toBe('function');
      onRouteEnter('enter');
      onRouteEntering('entering');
      onRouteEntered('entered');
      onRouteExit('exit');
      onRouteExiting('exiting');
      onRouteExited('exited');
      onRouteUpdated('updated');
    }

    render() {
      return null;
    }
  }

  function event(name) {
    delete expectedEvents[name];
    if (Object.keys(expectedEvents).length) {
      done();
    }
  }

  context.component = renderer.create(
    <Steersman
      history={history}
      onRouteUpdated={event}
      onRouteEnter={event}
      onRouteEntering={event}
      onRouteEntered={event}
      onRouteExit={event}
      onRouteExiting={event}
      onRouteExited={event}
    >
      <EventTest />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});


