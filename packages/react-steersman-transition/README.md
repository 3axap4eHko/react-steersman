# React Steersman Transition

Tiny react transition library

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

### Browser example

JSS example
```javascript
import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';

const styles = theme => ({
  'animation': {
    transition: 'opacity 1s ease',
  },
  'fade-enter-start': {
    opacity: 0,
  },
  'fade-enter-active': {
    opacity: 1,
  },
  'fade-enter-done': {
    opacity: 1,
  },
});

function mapProps({ direction, status }) {
  return { 
    className: classNames(
      classes.animation, 
      classes[`fade-${direction}-${status}`],
    )
  }
}

@withStyles(styles)
export default class App extends Component {
  render() {
    const { classes } = this.props;
    return <Transition 
       timeout={1000} 
       mapProps={mapProps}
       children={({ className }) => <div className={className}>transition</div> }
       startOnMount
     />
  }
}    
```
Style object example
```javascript
import React, { Component } from 'react';

const styles = {
  'animation': {
    transition: 'all 1s ease',
  },
  'fade-enter-start': {
    opacity: 0,
  },
  'fade-enter-active': {
    opacity: 1,
  },
  'fade-enter-done': {
    opacity: 1,
  },
};

function mapProps({ direction, status }) {
  return { 
    style: {
      ...styles.animation, 
      ...styles[`fade-${direction}-${status}`]
    },
  };
}

export default class App extends Component {
  render() {
    return <Transition  
      timeout={1000} 
      mapProps={mapProps}
      children={({ style }) => <div style={style}>transition</div>}
      startOnMount
    />
  }
}
```

### React Native example
```javascript
import React, { Component } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  'text': {
    color: '#000',
  },
});

export default class App extends Component {
  
  static timeout = 375;
  
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
      children={() => <Animated.Text style={[styles.text, { opacity: this.value }]}>transition</Animated.Text>}
      onEnter={this.animate}
      startOnMount
    />
  }
}
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017-2018 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman-transition.svg
[npm-url]: https://www.npmjs.com/package/react-steersman-transition
[npm-image]: https://img.shields.io/npm/v/react-steersman-transition.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg
