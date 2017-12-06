import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import MatchTransition from '../MatchTransition';

class TestWrapper extends Component {
  state = {
    match: this.props.match,
  };

  setMatch = match => {
    this.setState({ match });
  };

  render() {
    const { history, ...props } = this.props;
    return (
      <Steersman history={history}>
        <MatchTransition
          match={this.state.match}
          {...props}
        >
          {({ direction, status }) => `${direction}:${status}`}
        </MatchTransition>
      </Steersman>
    );
  }
}

test('MatchTransition enter no match', done => {
  const context = {};
  const history = createMemoryHistory();

  function onEnter() {
    expect(context.component.toJSON()).toBe('enter:init');
    context.enter = true;
  }

  function onEntering() {
    expect(context.component.toJSON()).toBe('enter:doing');
    context.entering = true;
  }

  function onEntered() {
    expect(context.enter).toBeTruthy();
    expect(context.entering).toBeTruthy();
    expect(context.component.toJSON()).toBe('enter:done');
    done();
  }

  context.component = renderer.create(<TestWrapper
    history={history}
    onEnter={onEnter}
    onEntering={onEntering}
    onEntered={onEntered}
  />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
  context.tree.instance.setMatch({});
});

test('MatchTransition enter match', done => {
  const context = {};
  const history = createMemoryHistory();

  function onEnter() {
    expect(context.component.toJSON()).toBe('enter:init');
    context.enter = true;
  }

  function onEntering() {
    expect(context.component.toJSON()).toBe('enter:doing');
    context.entering = true;
  }

  function onEntered() {
    expect(context.enter).toBeTruthy();
    expect(context.entering).toBeTruthy();
    expect(context.component.toJSON()).toBe('enter:done');
    done();
  }

  context.component = renderer.create(<TestWrapper
    match={{}}
    history={history}
    onEnter={onEnter}
    onEntering={onEntering}
    onEntered={onEntered}
  />);

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('enter:done');
  context.tree.instance.setMatch({ a: 1 });
});

test('MatchTransition enter no match startOnMount', () => {
  const context = {};
  const history = createMemoryHistory();

  function noExecution() {
    expect(() => {throw new Error}).not.toThrowError();
  }

  context.component = renderer.create(<TestWrapper
    history={history}
    onEnter={noExecution}
    onEntering={noExecution}
    onEntered={noExecution}
    startOnMount
  />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe(null);
});

test('MatchTransition enter match startOnMount', done => {
  const context = {};
  const history = createMemoryHistory();

  function onEnter() {
    expect(context.component.toJSON()).toBe('enter:init');
    context.enter = true;
  }

  function onEntering() {
    expect(context.component.toJSON()).toBe('enter:doing');
    context.entering = true;
  }

  function onEntered() {
    expect(context.enter).toBeTruthy();
    expect(context.entering).toBeTruthy();
    expect(context.component.toJSON()).toBe('enter:done');
    done();
  }

  context.component = renderer.create(<TestWrapper
    match={{}}
    history={history}
    onEnter={onEnter}
    onEntering={onEntering}
    onEntered={onEntered}
    startOnMount
  />);
  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('enter:init');
});
