# &lt; Route  &gt;

The Component renders children when current location matches the route’s path.

## Description

Component `Route` renders children when current location matches the route’s path.
It passes matched parameters as props to the rendered children.

## Props

It has all props of [Match](Match.md) Component and:

#### transitionTimeout: number.isRequired

The duration of the transition, in milliseconds.

Default: `0`

#### mapProps: func

The function maps routed components props.

Default: `props => props`

#### onUpdated: func

Fired on route update

#### onEnter: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_START`

#### onEntering: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_ACTIVE`

#### onEntered: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_DONE`

#### onExit: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_START`

#### onExiting: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_ACTIVE`

#### onExited: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_DONE`


```javascript
import React from 'react';
import { render } from 'react-dom';
import { Steersman, Route, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

render(
  <Steersman history={history}>
    <Route path="/" children={() => 'Home'} />
    <Route path="/profile" children={() => 'Profile'} />
    <Route path="/dashboard" children={() => 'Dashboard'} />
  </Steersman>,
  document.getElementById('app')
);
```