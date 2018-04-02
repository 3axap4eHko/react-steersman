import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import renderer from 'react-test-renderer';
import createMemoryHistory from 'history/createMemoryHistory';
import Steersman, { withContext } from '../Steersman';
import Route from '../Route';
import navigate from '../navigate';

const TEST_VALUE = 1;

@withContext
class Test extends Component {

  @navigate('/test')
  goToTest = value => {
    expect(value).toBe(TEST_VALUE);
  };

  @navigate('/')
  goBack(value) {
    expect(value).toBe(TEST_VALUE);
  };

  componentDidMount() {
    setTimeout(this.goToTest, 300, TEST_VALUE);
  }

  render() {
    const { onEntered } = this.props;
    return (
      <Fragment>
        <Route path="/" children={() => 'home'}/>
        <Route path="/test" children={() => 'test'} onEntered={onEntered}/>
      </Fragment>
    );
  }
}


test('Link Web active', done => {
  const context = {};
  const history = createMemoryHistory();

  function onEntered() {
    expect(context.component.toJSON()).toBe('test');
    done();
  }

  context.component = renderer.create(
    <Steersman history={history}>
      <Test onEntered={onEntered} />
    </Steersman>
  );

  context.tree = context.component.toTree();
  expect(context.component.toJSON()).toBe('home');
});

