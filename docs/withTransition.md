# withTransition

HOC state machine that allows control transitions in an easiest way.

## Description

At any time the state machine can be described by `direction` and `status` parameters.
Direction can be: `DIRECTION_ENTER`, `DIRECTION_EXIT`.
Status can be: `STATUS_START`, `STATUS_ACTIVE` and `STATUS_DONE`.

## Args

#### timeout: number

Transition timeout. 
If it equals `0` state machine skips statuses `STATUS_START` and `STATUS_ACTIVE`. 

Default: `0`

#### direction: oneOf([DIRECTION_ENTER, DIRECTION_EXIT])

Initial transition direction. 

Default: `DIRECTION_ENTER`

#### mapProps: func

A function that maps transition component props.

Default: `props => props`

#### startOnMount: bool

A flag that start transition on first mount.

Default: `false`

#### freezePropsOnExit: bool

Prevent props changing on exit.

Default: `false`

#### props: object

Extra props to pass to children.

Default: `{}`


## Examples


```javascript
import React, { Component } from 'react';
import withTransition from 'react-steersman/withTransition';

const styles = {
  'fade-enter-start': {
    opacity: 0,
    backgroundColor: '#000',
  },
  'fade-enter-active': {
    opacity: 1,
    backgroundColor: '#fff',
  },
  'fade-enter-done': {
    opacity: 1,
    backgroundColor: '#fff',
  },
};

function mapProps({ timeout, direction, status }) {
  return {
    style: {
      transition: `opacity ${timeout}ms ease`,
      ...styles[`fade-${direction}-${status}`]
    },
  };
}

@withTransition({ mapProps, timeout: 1000, startOnMount: true })
class DemoComponent extends Component {
  render() {
    const { style } = this.props;
    return <div style={style}>a transition</div>;
  }
}

export default class App extends Component {
  render() {
    return <DemoComponent />;
  }
}
```