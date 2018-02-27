# &lt; MatchGroup &gt;

The Component matches a first path to current location.

## Description

Component `MatchGroup` is doing the same as `Match` only difference that matched will be only first from group.
All other `MatchGroup` will have `match` equals `null`. 

## Props

`<MatchGroup>` has all props of [&lt; Match &gt;](Match.md) component and also:

#### group: string

A name of group

Default: `default`

## Example

```javascript
import React from 'react';
import { Steersman, MatchGroup, createBrowserHistory } from 'react-steersman';

const history = createBrowserHistory();

<Steersman history={history}>
  <MatchGroup path="/" children={() => 'Home'} group="screen" />
  <MatchGroup path="/profile" children={() => 'Profile'} group="screen" />
  <MatchGroup path="/dashboard" children={() => 'Dashboard'} group="screen" />
  <MatchGroup path=".*" children={() => 'Nothing matched'} group="screen" />
</Steersman>
```