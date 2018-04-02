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
import Route from 'react-steersman/Route';
import Redirect from 'react-steersman/Redirect';
import createBrowserHistory from 'react-steersman/createBrowserHistory';

const history = createBrowserHistory();

render(
  <Steersman history={history} >
    <Route path="/" children={() => 'Home'} group="page" />
    <Route path="/profile" children={() => 'Profile'}  group="page" />
    <Route path="/dashboard" children={() => 'Dashboard'}  group="page" />
    <Route path=".*" children={Redirect} props={{ path: '/' }}  group="page" />
  </Steersman>,
  document.getElementById('app'),
);
```