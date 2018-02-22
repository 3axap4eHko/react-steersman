# Match


```javascript
import React from 'react';
import { render } from 'react-dom';
import { Steersman, Match, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

function outputUserId(props) {
  return <div>{props.match.userId}</div>;
}

render(
  <Steersman history={history}>
    <Match path="/user/:userId" children={outputUserId} />
  </Steersman>,
  document.getElementById('app')
);
```