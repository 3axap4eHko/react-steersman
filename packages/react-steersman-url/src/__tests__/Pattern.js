import Pattern from '../Pattern';

test('Should works without placeholders (positive)', () => {
  const compiled = Pattern.fromString('/test');
  expect(compiled.build({ userId: 1 })).toBe('/test');
  expect(compiled.match('/test')).toMatchObject({});
});

test('Should works in not strict mode', () => {
  const compiled = Pattern.fromString('/test', { strict: false });
  expect(compiled.match('/test')).toMatchObject({});
  expect(compiled.match('/test/')).toMatchObject({});
});

test('Should works in not exact mode', () => {
  const compiled = Pattern.fromString('/test', { exact: false });
  expect(compiled.match('/test')).toMatchObject({});
  expect(compiled.match('/test/subtest')).toMatchObject({});
});

test('Should works without placeholders (negative)', () => {
  const compiled = Pattern.fromString('/test');
  expect(compiled.build({ userId: 1 })).toBe('/test');
  expect(compiled.match('/')).toBeFalsy();
  expect(compiled.match('/?query')).toBeFalsy();
  expect(compiled.match('/#hash')).toBeFalsy();
});

test('Compiled should parse simple placeholders (positive)', () => {
  const compiled = Pattern.fromString('/user/:userId');
  expect(compiled.build({ userId: 1 })).toBe('/user/1');
  expect(compiled.match('/user/1')).toMatchObject({ userId: '1' });
});

test('Compiled should parse simple placeholders (negative)', () => {
  const compiled = Pattern.fromString('/user/:userId');
  expect(compiled.build({})).toBe('/user/:userId');
  expect(compiled.match('/user')).toBeFalsy();
  expect(compiled.match('/user/2/test')).toBeFalsy();
  expect(compiled.match('/user/2?query')).toBeFalsy();
  expect(compiled.match('/user/2#hash')).toBeFalsy();
});

test('Compiled should parse constrained placeholders', () => {
  const compiled = Pattern.fromString('/user/:userId(\\d+)|int');
  const userId = Math.round(10000 * Math.random());
  const url = compiled.build({ userId });
  expect(url).toBe(`/user/${userId}`);
  const params = compiled.match(url);
  expect(params).toMatchObject({ userId });
  expect(compiled.match('/user')).toBeFalsy();
  expect(compiled.match('/user/2/test')).toBeFalsy();
  expect(compiled.match('/user/2?query')).toBeFalsy();
  expect(compiled.match('/user/2#hash')).toBeFalsy();
});
