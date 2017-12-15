# React Steersman URL

Tiny and Fast URL utils

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage

```javascript
interface URI {
 protocol      // returns protocol
 username      // returns username if exists otherwise false
 password      // returns password if exists otherwise false
 hostname      // returns hostname
 port          // returns port if exists otherwise false
 host          // returns host
 origin        // returns origin
 path          // returns path
 pathParts     // returns path parts
 query         // returns query
 queryParams   // returns query as object
 hash          // returns hash
 toString()    // converts URI instance to string
 toObject()    // converts URI instance to Object
}

const uri = URI.parse('https://example.com');
console.log(uri.toObject());
```

```javascript
interface Pattern {
  static fromString(url: string): Pattern
  build(params: object): string
  match(url: string): (object|null)
}

const compiled = Pattern.fromString('/user/:userId(\\d+)|int');
const userId = 4520;
const url = compiled.build({ userId });
console.log(url) // /user/4520
const params = compiled.match(url);
console.log(params) // { userId: 4520 }
```

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-steersman-transition.svg
[npm-url]: https://www.npmjs.com/package/react-steersman-transition
[npm-image]: https://img.shields.io/npm/v/react-steersman-transition.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-steersman
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-steersman/master.svg
