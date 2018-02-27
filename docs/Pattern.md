# Pattern

The Pattern class that matches a URL and returns matched parameters or build a URL from provided parameters.

## Interface

```typescript
interface PatternConfig {
  strict: bool;                                                 // A flag that enables strict mode matching.
  exact: bool;                                                  // A flag that enables exact mode matching.
}

interface Pattern {
  static fromString(pattern: string, options: PatternConfig);   // Creates instance of Pattern from pattern string
  build(parameters: object);                                    // Creates a string from pattern and passed parameters
  match(input: string);                                         // Matches string to pattern and returns object with matched parameters or null
  onMatch(callback: function);                                  // Adds a match listener. Returns a function that unsubscribes the match listener
}
```

## Examples

#### Instantiation

```javascript
import Pattern from 'uriil/Pattern';

// A strict pattern matches only "/list" not to "/list/"
Pattern.fromString('/list', { strict: false })
// A exact pattern matches only "/" and "/random"
Pattern.fromString('/random', { exact: false })
// A pattern matches an email parameter and transforms to lowercase
Pattern.fromString('/users/:email|lower')
// A pattern matches an guid parameter and transforms to uppercase
Pattern.fromString('/conversations/:guid|upper')
// A pattern matches only digits to id parameter and transforms to int type
Pattern.fromString('/items/:id(\\d+)|int')
// A pattern matches unreadOnly parameter and transforms to boolean type
Pattern.fromString('/messages/:unreadOnly|bool')
// A pattern matches latitude and longitude parameters and transforms both to float type
Pattern.fromString('/map/:latitude|float/:longitude|float')
// A pattern matches seed parameter and transforms to number type
Pattern.fromString('/random/:seed|number')
```

#### Build

```javascript
import Pattern from 'uriil/Pattern';

const pattern = Pattern.fromString('/users/:email|lower');
pattern.build({ email: 'email@example.com' });                  // /users/email%40example.com
```

#### Match

```javascript
import Pattern from 'uriil/Pattern';

const pattern = Pattern.fromString('/users/:email|lower');
pattern.match('/user/wrong@example.com');                       // false
pattern.match('/users/correct@example.com');                    // { email: "correct@example.com" }
```

