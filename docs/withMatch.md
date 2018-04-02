# withRoute

`withMatch` is higher-order Match component that matches location.

```javascript
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import Steersman from 'react-steersman/Steersman';
import withMatch from 'react-steersman/withMatch';

const history = createBrowserHistory();

@withMatch({ path: '/user/:userId' })
class UserInfo extends Component {
  render() {
    const { match } = this.props;
    return match.userId;
  }
}

render(
  <Steersman history={history}>
    <UserInfo />
  </Steersman>,
  document.getElementById('app')
);
```