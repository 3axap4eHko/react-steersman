# &lt; Transition &gt;

State machine that allows control transitions in an easiest way.

## Description

At any time the state machine can be described by `direction` and `status` parameters.
Direction can be: `DIRECTION_ENTER`, `DIRECTION_EXIT`.
Status can be: `STATUS_START`, `STATUS_ACTIVE` and `STATUS_DONE`.

## Props

#### children: func.isRequired,

A component or child as a function. 
Receives an object with properties: `direction`, `status` and properties from `props`. 

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

#### force: any

A value to force start transition, should be a different from a previous value.

#### props: object

Extra props to pass to children.

Default: `{}`

#### onEnter: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_START`

#### onEntering: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_ACTIVE`

#### onEntered: func

Fired on `direction` is `DIRECTION_ENTER` and `status` is `STATUS_DONE`

#### onExit: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_START`

#### onExiting: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_ACTIVE`

#### onExited: func

Fired on `direction` is `DIRECTION_EXIT` and `status` is `STATUS_DONE`

## Examples

### Browser example

JSS example
```javascript
import React, { Component } from 'react';
import withStyles from 'react-jss';
import Transition from 'react-transistor/Transition';

const styles = theme => ({
  'animation': {
    transition: 'opacity 1s ease',
  },
  'fade-enter-start': {
    opacity: 0,
    backgroundColor: theme.palette.primary,
  },
  'fade-enter-active': {
    opacity: 1,
    backgroundColor: theme.palette.secondary,
  },
  'fade-enter-done': {
    opacity: 1,
    backgroundColor: theme.palette.secondary,
  },
});

function mapProps({ classes, timeout, direction, status }) {
  return { 
    style: { transition: `opacity ${timeout}ms ease` },
    className: `${classes.animation} fade-${direction}-${status}`,
  }
}

function DemoComponent({ style, className }) {
  return <div style={style} className={className}>a transition</div>;
}

@withStyles(styles)
export default class App extends Component {
  render() {
    const { classes } = this.props;
    
    return <Transition 
       timeout={1000} 
       props={{ classes }}
       mapProps={mapProps}
       children={DemoComponent}
       startOnMount
     />
  }
}    
```

Style object example
```javascript
import React, { Component } from 'react';
import Transition from 'react-transistor/Transition';

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

function DemoComponent({ style }) {
  return <div style={style}>a transition</div>;
}


export default class App extends Component {
  render() {
    return <Transition  
      timeout={1000} 
      mapProps={mapProps}
      children={DemoComponent}
      startOnMount
    />
  }
}
```

### React Native example
```javascript
import React, { Component } from 'react';
import Transition from 'react-transistor/Transition';
import { Animated, Easing, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  'text': {
    color: '#000',
    width: 100,
  },
});

function DemoComponent({ opacity, width }) {
  return <Animated.Text style={[styles.text, { opacity, width }]}>a transition</Animated.Text>;
}

const WIDTH_INTERPOLATION = {
  inputRange: [0, 1],
  outputRange: [100, 200]
};

export default class App extends Component {
  
  static timeout = 1000;
  
  value = new Animated.Value(0);
  
  animate = (direction) => {
    if (this.animation) {
      this.animation.stop();
    }
    const display = direction === 'enter';
    this.value.setValue(display ? 0 : 1);
    this.animation = Animated.timing(this.value,
      {
        toValue: display ? 1 : 0,
        duration: App.timeout,
        easing: Easing.cubic,
      },
    ).start();
  };
  
  render() {
    return <Transition  
      timeout={App.timeout} 
      props={{ 
        opacity: this.value, 
        width: this.value.interpolate(WIDTH_INTERPOLATION) 
      }}
      children={DemoComponent}
      onEnter={this.animate}
      onExit={this.animate}
      startOnMount
    />
  }
}
```