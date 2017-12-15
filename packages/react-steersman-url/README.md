# React Steersman URL

Tiny URL utils

## Usage

```javascript
import Pattern from 'react-steersman-url/Pattern';

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

