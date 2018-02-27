# &lt; Redirect &gt;

Redirects to provided path if rendered

## Props

#### path: string.isRequired
Redirecting path 

## Example

```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import RouteGroup from 'react-steersman/RouteGroup';
import Redirect from 'react-steersman/Redirect';
import createBrowserHistory from 'react-steersman/createBrowserHistory';

const history = createBrowserHistory();

render(
  <Steersman history={history} >
    <RouteGroup path="/" children={() => 'Home'} group="page" />
    <RouteGroup path="/profile" children={() => 'Profile'}  group="page" />
    <RouteGroup path="/dashboard" children={() => 'Dashboard'}  group="page" />
    <RouteGroup path=".*" children={Redirect} props={{ path: '/' }}  group="page" />
  </Steersman>,
  document.getElementById('app'),
);
```