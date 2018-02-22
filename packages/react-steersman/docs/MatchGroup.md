# Match


```javascript
import React from 'react';
import { render } from 'react-dom';
import { Steersman, MatchGroup, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

render(
  <Steersman history={history}>
    <MatchGroup path="/" children={() => 'Home'} />
    <MatchGroup path="/profile" children={() => 'Profile'} />
    <MatchGroup path="/dashboard" children={() => 'Dashboard'} />
    <MatchGroup path=".*" children={() => 'Nothing matched'} />
  </Steersman>,
  document.getElementById('app')
);
```