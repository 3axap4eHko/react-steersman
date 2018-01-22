# React Steersman

Tiny and fast react navigation library

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

### Simple browser example 
```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Route from 'react-steersman/Route';

const history = createBrowserHistory();

function Dashboard({ direction, status }) {
  return `Dashboard ${direction}-${status}`;
}

function User({ match: { username } }) {
  return `User ${username}`;
}

render(
  <Steersman history={history}>
    <Route path="/" children={Dashboard}/>
    <Route path="/user/:username" children={User}/>
  </Steersman>,
  document.getElementById('app'),
);
```

### Simple react-native example
```javascript
import React, { Component } from 'react';
import Steersman from 'react-steersman/Steersman';
import createMemoryHistory from 'react-steersman/createMemoryHistory';
import Route from 'react-steersman/Route';

const history = createMemoryHistory();

function Dashboard({ direction, status }) {
  return `Dashboard ${direction}-${status}`;
}

function User({ match: { username } }) {
  return `User ${username}`;
}

export default class App extends Component {
  render() {
    return (
      <Steersman history={history}>
        <Route path="/" children={Dashboard}/>
        <Route path="/user/:username" children={User}/>
      </Steersman>
    );
  }
}

registerRootComponent(App);
```

### Browser example with transitions
```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Route from 'react-steersman/Route';

const history = createBrowserHistory();


function Dashboard({ direction, status }) {
  return (
    <div className={className}>
      {`Dashboard ${direction}-${status}`}
    </div>
  );
}

class User extends Component {
  render() {
    const { match: { username } } = this.props;
    return (
      <div className={className}>
        {`User ${username}`}
      </div>
    );
  }
}

function mapProps(direction, status) {
  return {
    className: `fade-${direction}-${status}`,
  };
}

render(
  <Steersman history={history} mapProps={mapProps}>
    <Route path="/" children={Dashboard}/>
    <Route path="/user/:username" children={User}/>
  </Steersman>,
  document.getElementById('app'),
);
```

### Mobile example

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman.svg
[npm-url]: https://www.npmjs.com/package/react-steersman
[npm-image]: https://img.shields.io/npm/v/react-steersman.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg