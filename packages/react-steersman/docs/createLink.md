# createLink

Function creates a link component

```javascript
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';

export default createLink(({ to, title, className, activeClassName, style, activeStyle, navigate, match }) => (
  <a
    href={to}
    className={classNames(className, { [activeClassName]: match })}
    style={{ ...style, ...(match ? activeStyle : {}) }}
    title={title}
    onClick={navigate}
  >
    {title}
  </a>
));
```