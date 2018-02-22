# Route


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
    <Route path=".*" children={() => 'Not found'} />
  </Steersman>,
  document.getElementById('app')
);
```