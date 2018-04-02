# withRoute

`withRoute` is higher-order Route component that renders received component if location matched.

```javascript
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Steersman from 'react-steersman/Steersman';
import withRoute from 'react-steersman/withRoute';

const history = createBrowserHistory();

@withRoute({ path: '/', group: 'main' })
class Home extends Component {
  render() {
    return 'Home';
  }
}

@withRoute({ path: '/dashboard', group: 'main' })
class Dashboard extends Component {
  render() {
    return 'Dashboard';
  }
}

render(
  <Steersman history={history}>
    <Home />
    <Dashboard />
  </Steersman>,
  document.getElementById('app')
);
```