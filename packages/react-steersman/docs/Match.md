# &lt; Match &gt;

Component matches path to current location.

## Description


## Props

#### children: func.isRequired

A component or child as a function.
Receives an object with properties: `match`, `location`, `path`, `method`, `exact` and properties from `props`.

#### path: string

A match pattern by package [URIIL](https://www.npmjs.com/package/uriil)

#### exact: bool

A flag that enables exact mode matching.

#### strict: bool

A flag that enables strict mode matching.

#### props: object

Extra props to pass to children.

## Examples
 

```javascript
import React from 'react';
import { Steersman, Match, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

function outputUserId(props) {
  return <div>{props.match.userId}</div>;
}
<Steersman history={history}>
  <Match path="/user/:userId|int" children={outputUserId} />
</Steersman>
```