/**
 * @module Pattern
 * @description The Pattern class that matches a URL and returns matched parameters or build a URL from provided parameters.
 */
import { $p } from './utils';

const placeholderParseRegexp = /(:([a-zA-Z0-9_-]+)(\(.*?\)\??)?(\|(\w+))?)/;
const placeholderRegexp = new RegExp(placeholderParseRegexp.source, 'g');

const defaultConstraint = '([^\\/\\?#:]+?)';
const defaultCast = 'string';

const PATTERN = 'PATTERN';
const PATTERN_REGEXP = 'PATTERN_REGEXP';
const PATTERN_PLACEHOLDER = 'PATTERN_PLACEHOLDER';
const NAMES = 'NAMES';
const CASTS = 'CASTS';
const ON_MATCH = 'ON_MATCH';

const selfRef = {};

function getPH(name) {
  return `:${name}`;
}

const castFunctions = {
  number(value) {
    return +value;
  },
  int(value) {
    return parseInt(value);
  },
  float(value) {
    return parseFloat(value);
  },
  string(value) {
    return value;
  },
  bool(value) {
    return /^true$/i.test(value);
  },
  lower(value) {
    return ''.toString.call(value).toLowerCase();
  },
  upper(value) {
    return ''.toString.call(value).toUpperCase();
  },
};

function compile(pattern) {
  return (pattern.match(placeholderRegexp) || []).reduce((result, placeholderData) => {
    const [, replacer, name, constraint = defaultConstraint, , cast = defaultCast] = placeholderData.match(placeholderParseRegexp);
    return {
      names: [...result.names, name],
      patternRegexp: result.patternRegexp.replace(replacer, constraint),
      patternPlaceholder: result.patternPlaceholder.replace(replacer, getPH(name)),
      casts: [...result.casts, cast],
    };
  }, {
    names: [],
    patternRegexp: pattern,
    patternPlaceholder: pattern,
    casts: [],
  });
}

function buildRegexp(patternRegexp, options) {
  const { strict = true, exact = true } = options;
  if (!strict) {
    patternRegexp = `${patternRegexp.replace(/(?!^)\/$/, '')}\\/?`;
  }
  if (exact) {
    patternRegexp = `${patternRegexp}$`;
  }
  return new RegExp(`^${patternRegexp}`);
}

/**
 * @module Pattern
 * @example <caption>Pattern usage examples</caption>
 *
 * interface Pattern {
 *    static fromString(pattern, options);  // creates instance of Pattern from pattern string
 *    build(parameters);                    // creates a string from pattern and passed parameters
 *    match(input);                         // matches string to pattern and returns object with matched parameters or null
 *    onMatch(callback);                    // Adds a match listener. Returns a function that unsubscribes the match listener
 * }
 *
 * const compiled = Pattern.fromString('/user/:userId(\\d+)|int');
 * const userId = 4520;
 * const url = compiled.build({ userId });
 * console.log(url) // /user/4520
 * const params = compiled.match(url);
 * console.log(params) // { userId: 4520 }
 */
export default class Pattern {

  constructor(ref) {
    if (ref !== selfRef) {
      throw new Error('Pattern constructor does not accept arguments');
    }
  }

  /**
   * Parses string pattern and returns instance of `Pattern`
   * @param {String} pattern
   * @param {Object} [options]
   * @returns {Pattern}
   * @example <caption>Pattern.fromString usage examples</caption>
   *
   * Pattern.fromString('/list', { strict: false })
   * Pattern.fromString('/users/:email|lower')
   * Pattern.fromString('/conversations/:guid|upper')
   * Pattern.fromString('/items/:id(\\d+)|int')
   * Pattern.fromString('/messages/:unreadOnly|bool')
   * Pattern.fromString('/map/:latitude|float/:longitude|float')
   * Pattern.fromString('/random', { exact: false })
   * Pattern.fromString('/random/:seed|number')
   */
  static fromString(pattern, options) {

    const { patternRegexp, patternPlaceholder, names, casts } = compile(pattern);
    const compiled = new Pattern(selfRef);

    $p(compiled, PATTERN, pattern);
    $p(compiled, PATTERN_REGEXP, buildRegexp(patternRegexp, options || {}));
    $p(compiled, PATTERN_PLACEHOLDER, patternPlaceholder);
    $p(compiled, NAMES, names);
    $p(compiled, CASTS, casts);
    $p(compiled, ON_MATCH, new Set());

    return compiled;
  }

  /**
   * Returns string from the pattern and passed parameters
   * @param {Object} parameters
   * @returns {String}
   * @example
   * const pattern = Pattern.fromString('/users/:email|lower')
   * pattern.build({ email: 'email@example.com' }); // /users/email@example.com
   */
  build(parameters) {
    return Object.keys(parameters).reduce((result, name) => {
      return result.replace(getPH(name), parameters[name]);
    }, $p(this, PATTERN_PLACEHOLDER));
  }

  /**
   * Matches pattern to input string and returns matched properties or null
   * @param {String} input
   * @returns {Object|null}
   * @example
   * const pattern = Pattern.fromString('/users/:email|lower')
   * pattern.match('/user/wrong@example.com'); // false
   * pattern.match('/users/correct@example.com'); // { email: "correct@example.com" }
   */
  match(input) {
    const matches = input.match($p(this, PATTERN_REGEXP));

    if (matches) {
      const matched = matches.slice(1).reduce((params, value, idx) => {
        const name = $p(this, NAMES)[idx];
        const cast = $p(this, CASTS)[idx];
        const castFunction = castFunctions[cast] || castFunctions.string;
        return { ...params, [name]: castFunction(value) };
      }, {});
      $p(this, ON_MATCH).forEach(callback => callback(matched));
      return matched;
    }
    return null;
  }

  /**
   * Subscribe for match event
   * @param {Function} callback
   * @returns {Function} unsubscribe from match listening
   * @example
   * const pattern = Pattern.fromString('/users/:email');
   * pattern.onMatch(parameters => console.log(parameters));
   * pattern.match('/users/correct@example.com');
   */
  onMatch(callback) {
    const listeners = $p(this, ON_MATCH);
    listeners.add(callback);
    return () => listeners.remove(callback);
  }

}
