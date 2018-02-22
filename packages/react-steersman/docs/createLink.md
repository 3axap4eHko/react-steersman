# createLink

```javascript
import createLink from 'react-steersman/createLink';

export default createLink(({ to, title, className, activeClassName, style, activeStyle, navigate, match }) => (
  <a
    href={to}
    className={merge([className, match && activeClassName])}
    style={merge([style, match && activeStyle])}
    title={title}
    onClick={navigate}
  >
    {title}
  </a>
));
```