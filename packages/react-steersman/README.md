# React Steersman

Tiny react navigation library

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage


```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Route from 'react-steersman/Route';

const history = createBrowserHistory();

function Dashboard({ direction, status }) {
  return 'Dashboard';
}

function User({ match: { username } }) {
  return `User ${username}`;
}

render(
  <Steersman history={history}>
    <Route path="/" children={() => 'Home'}/>
    <Route path="/dashboard" children={Dashboard}/>
    <Route path="/user/:username" children={User}/>
  </Steersman>,
  document.getElementById('app'),
);
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman.svg
[npm-url]: https://www.npmjs.com/package/react-steersman
[npm-image]: https://img.shields.io/npm/v/react-steersman.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg