# React Steersman

Tiny react navigation library

## Usage

```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Route from 'react-steersman/Route';

const history = createBrowserHistory();

function Dashboard() {
  return 'Dashboard';
}

function User({ match: { username } }) {
  return `User ${username}`;
}

render(
  <Steersman history={history}>
    <Route path="/" render={() => 'Home'}/>
    <Route path="/dashboard" render={Dashboard}/>
    <Route path="/user/:username" render={User}/>
  </Steersman>,
  document.getElementById('app'),
);
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017 Ivan Zakharchanka

