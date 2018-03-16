# React Steersman

Tiny fast and real cross-platform react navigation library

<p align="center">
  <a href="https://pro-js.com/react-steersman/">
    <img alt="React Steersman" src="https://raw.githubusercontent.com/3axap4eHko/react-steersman/master/website/static/Logo.png" width="256">
  </a>
</p>

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Documentation

 - [Steersman](https://github.com/3axap4eHko/react-steersman/blob/master/docs/Steersman.md)
 - [Match](https://github.com/3axap4eHko/react-steersman/blob/master/docs/Match.md)
 - [Route](https://github.com/3axap4eHko/react-steersman/blob/master/docs/Route.md)
 - [RouteContext](https://github.com/3axap4eHko/react-steersman/blob/master/docs/RouteContext.md)
 - [Redirect](https://github.com/3axap4eHko/react-steersman/blob/master/docs/Redirect.md)
 - [createLink](https://github.com/3axap4eHko/react-steersman/blob/master/docs/createLink.md)
 - [navigate](https://github.com/3axap4eHko/react-steersman/blob/master/docs/navigate.md)
 - [withNav](https://github.com/3axap4eHko/react-steersman/blob/master/docs/withNav.md)

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


function Dashboard({ className }) {
  return (
    <div className={className}>
      {`Dashboard ${direction}-${status}`}
    </div>
  );
}

class User extends Component {
  render() {
    const { className, match: { username } } = this.props;
    return (
      <div className={className}>
        {`User ${username}`}
      </div>
    );
  }
}

function mapProps({ direction, status }) {
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

### Render one route from a group routes
```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Route from 'react-steersman/Route';

const history = createBrowserHistory();

render(
  <Steersman history={history}>
    <Route path="/" children={() => 'Home Top Bar'} group="top-bar"/>
    <Route path="/profile" children={() => 'Profile Top Bar'} group="top-bar"/>
    <Route path=".*" children={() => 'Other page Top Bar'} group="top-bar"/>
    <Route path="/" children={() => 'Home'} />
    <Route path="/profile" children={() => 'Profile'}/>
  </Steersman>,
  document.getElementById('app'),
);
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017-2018 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman.svg?longCache=true&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/react-steersman
[npm-image]: https://img.shields.io/npm/v/react-steersman.svg?longCache=true&style=for-the-badge

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg?longCache=true&style=for-the-badge