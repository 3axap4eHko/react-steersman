# createLink

Function creates a link component

## Browser example
```javascript
import React from 'react';
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';

export default createLink(({ to, title, className, activeClassName, style, activeStyle, navigate, match }) => (
  <a
    href={to}
    className={classNames(className, { [activeClassName]: match })}
    style={{ ...style, ...(match ? activeStyle : {}) }}
    title={title}
    onClick={() => navigate(to)}
  >
    {title}
  </a>
));
```

## React Native example
```javascript
import React from 'react';
import { Button } from 'react-native';
import createLink from 'react-steersman/createLink';

export default createLink(({ to, title, style, activeStyle, navigate, match }) => (
  <Button
    href={to}
    style={[style, match && activeStyle]}
    title={title}
    onClick={() => navigate(to)}
  />
));
```