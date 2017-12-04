const placeholderParseRegexp = /(:([a-zA-Z0-9_-]+)(\(.*?\)\??)?(\|(\w+))?)/;
const placeholderRegexp = new RegExp(placeholderParseRegexp, 'g');

const defaultConstraint = '([^\\/\\?#:]+?)';
const defaultCast = 'string';

const _pattern = Symbol('URL pattern');
const _patternRegexp = Symbol('URL pattern regexp');
const _patternPlaceholder = Symbol('URL pattern placeholder');
const _names = Symbol('URL names');
const _casts = Symbol('URL cast');

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
    patternRegexp = `${patternRegexp.replace(/(?!^)\/$/,'')}\\/?`;
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
 *    match(input);                         // matches string to pattern and returns object with matched parameters or null
 *    build(parameters);                    // creates a string from pattern and passed parameters
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
   * Pattern.fromString('/map/:long|float/:lat|float')
   * Pattern.fromString('/random', { exact: false })
   * Pattern.fromString('/random/:seed|number')
   */
  static fromString(pattern, options) {

    const { patternRegexp, patternPlaceholder, names, casts } = compile(pattern);
    const compiled = new Pattern();

    compiled[_pattern] = pattern;
    compiled[_patternRegexp] = buildRegexp(patternRegexp, options || {});
    compiled[_patternPlaceholder] = patternPlaceholder;
    compiled[_names] = names;
    compiled[_casts] = casts;

    return compiled;
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
    const matches = input.match(this[_patternRegexp]);

    if (matches) {
      return matches.slice(1).reduce((params, value, idx) => {
        const name = this[_names][idx];
        const cast = this[_casts][idx];
        const castFunction = castFunctions[cast] || castFunctions.string;
        return { ...params, [name]: castFunction(value) };
      }, {});
    }
    return null;
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
    }, this[_patternPlaceholder]);
  }
}