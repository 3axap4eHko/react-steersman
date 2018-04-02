import React, { Component } from 'react';
import { func, object, shape } from 'prop-types';
import renderer from 'react-test-renderer';
import createMemoryHistory from 'history/createMemoryHistory';
import Steersman, { withContext } from '../Steersman';

test('Steersman defaults', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      defaults
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

  @withContext
  class EventTest extends Component {
    static propTypes = {
      steersman: shape({
        history: object,
        onEnter: func,
        onEntering: func,
        onEntered: func,
        onExit: func,
        onExiting: func,
        onExited: func,
        onUpdated: func,
      }),
    };

    componentDidMount() {
      const { history, onEnter, onEntering, onEntered, onExit, onExiting, onExited, onUpdated } = this.props.steersman;
      expect(typeof history).toBe('object');
      expect(typeof onEnter).toBe('function');
      expect(typeof onEntering).toBe('function');
      expect(typeof onEntered).toBe('function');
      expect(typeof onExit).toBe('function');
      expect(typeof onExiting).toBe('function');
      expect(typeof onExited).toBe('function');
      expect(typeof onUpdated).toBe('function');
      onEnter('enter');
      onEntering('entering');
      onEntered('entered');
      onExit('exit');
      onExiting('exiting');
      onExited('exited');
      onUpdated('updated');
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
      onUpdated={event}
      onEnter={event}
      onEntering={event}
      onEntered={event}
      onExit={event}
      onExiting={event}
      onExited={event}
    >
      <EventTest />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});


