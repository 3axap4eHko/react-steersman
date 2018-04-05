import React from 'react';
import renderer from 'react-test-renderer';
import createMemoryHistory from 'history/createMemoryHistory';
import Steersman from '../Steersman';
import createLink from '../createLink';

const defaultColor = '#fff';
const activeColor = '#f00';
const className = 'class';
const activeClassName = 'active';

function merge(values, joiner = ' ') {
  return values.reduce((result, value) => {
    if (value) {
      if (typeof result === 'string') {
        return result + joiner + value;
      } else if (typeof result === 'object') {
        return { ...result, ...value };
      }
    }
    return result;
  });
}

const Link = createLink(({ to, title, active, className, activeClassName, style, activeStyle, navigate }) => (
  <a
    href={to}
    className={merge([className, active && activeClassName])}
    style={merge([style, active && activeStyle])}
    title={title}
    onClick={navigate}
  >
    {title}
  </a>
));

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
      />
    </Steersman>,
  );
  context.tree = context.component.toTree();
  const json = context.component.toJSON();
  expect(json.props.style.color).not.toBe(activeColor);
  expect(json.props.className).not.toContain(activeClassName);
  expect(json).toMatchSnapshot();
});
