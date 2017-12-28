# React Steersman Transition

Tiny react transition library

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

```javascript
    <Transition 
      timeout={1000} 
      startOnMount
      children={({ direction, status }) => `${direction}:${status}`}
    />
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman-transition.svg
[npm-url]: https://www.npmjs.com/package/react-steersman-transition
[npm-image]: https://img.shields.io/npm/v/react-steersman-transition.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg
