import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from '../createMemoryHistory';
import Steersman from '../Steersman';
import Link from '../Link';

const defaultColor = '#fff';
const activeColor = '#f00';
const className = 'class';
const activeClassName = 'active';

function TestComponent(props) {
  return <a {...props} />;
}

test('Link Web active', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Link
        to="/"
        title="Test"
        className={className}
        activeClassName={activeClassName}
        style={{ color: defaultColor, background: '#000' }}
        activeStyle={{ color: activeColor }}
        onClick={() => {}}
        component={TestComponent}
      />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  const json = context.component.toJSON();
  expect(json.props.style.color).toBe(activeColor);
  expect(json.props.className).toContain(activeClassName);
  expect(json).toMatchSnapshot();
});

test('Link Web inactive', () => {
  const context = {};
  const history = createMemoryHistory();

  context.component = renderer.create(
    <Steersman history={history}>
      <Link
        to="/test"
        title="Test"
        className={className}
        activeClassName={activeClassName}
        style={{ color: defaultColor, background: '#000' }}
        activeStyle={{ color: activeColor }}
        onClick={() => {}}
        component={TestComponent}
      />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  const json = context.component.toJSON();
  expect(json.props.style.color).not.toBe(activeColor);
  expect(json.props.className).not.toContain(activeClassName);
  expect(json).toMatchSnapshot();
});
