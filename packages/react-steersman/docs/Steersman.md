# &lt; Steersman &gt;

Required parent component for all steersman components.

## Description

`<Steersman>` provides access to the history management and some common settings for routing.

## Props

`<Steersman>` has all props of [&lt; Route &gt;](Route.md) component and also:
#### history: object.isRequired
A history instance. Can be: browser, hash and memory 

## Example

```javascript
import React from 'react';
import { render } from 'react-dom';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';

const history = createBrowserHistory();

render(
  <Steersman history={history} />,
  document.getElementById('app'),
);
```