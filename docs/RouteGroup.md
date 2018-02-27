# &lt; RouteGroup  &gt;

The Component renders children first from group when current location matches the route’s path.

## Description

Component `RouteGroup` is doing the same as `Route` only difference that matched will be only first from group.
All other `RouteGroup` will not be rendered. 

## Props

`<RouteGroup>` has all props of [&lt; Route &gt;](Route.md) component and also:

## Example

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Steersman, RouteGroup, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

render(
  <Steersman history={history}>
    <RouteGroup path="/" children={() => 'Home'} group="page" />
    <RouteGroup path="/profile" children={() => 'Profile'}  group="page" />
    <RouteGroup path="/dashboard" children={() => 'Dashboard'}  group="page" />
    <RouteGroup path=".*" children={() => 'Not found'}  group="page" />
  </Steersman>,
  document.getElementById('app')
);
```