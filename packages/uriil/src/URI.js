import { $p } from './utils';

const urlParseExpr = /^([\w-]+):\/\/((.*?)(:(.*?))?@)?(.*?)(:(\d+))?(\/.*?)(\?(.*?))?(#(.*))?$/;

const PROTOCOL = 'PROTOCOL';
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';
const HOSTNAME = 'HOSTNAME';
const PORT = 'PORT';
const PATH = 'PATH';
const PATH_PARTS = 'PATH_PARTS';
const QUERY = 'QUERY';
const QUERY_PARAMS = 'QUERY_PARAMS';
const HASH = 'HASH';

/**
 * @module URI
 * @example <caption>URI usage examples</caption>
 *
 * interface URI {
 *  protocol      // returns protocol
 *  username      // returns username if exists otherwise false
 *  password      // returns password if exists otherwise false
 *  hostname      // returns hostname
 *  port          // returns port if exists otherwise false
 *  host          // returns host
 *  origin        // returns origin
 *  path          // returns path
 *  pathParts     // returns path parts
 *  query         // returns query
 *  queryParams   // returns query as object
 *  hash          // returns hash
 *  toString();   // converts URI instance to string
 *  toObject();   // converts URI instance to Object
 * }
 *
 *
 * const uri = URI.parse('https://example.com');
 * console.log(uri.toObject());
 */

export default class URI {

  static parse(url) {
    const matches = url.match(urlParseExpr);
    if (!matches) {
      throw new TypeError(`Invalid input URI: '${url}'`);
    }
    return {
      protocol: matches[1],
      username: decodeURIComponent(matches[3]),
      password: decodeURIComponent(matches[5]),
      hostname: matches[6],
      port: matches[8],
      path: matches[9],
      query: matches[11],
      hash: matches[13],
    };
  }

  static build(params) {
    let url = '';
    url += `${(params.protocol || 'http')}://`;
    if (params.username) {
      url += encodeURIComponent(params.username);
      if (params.password) {
        url += `:${encodeURIComponent(params.password)}`;
      }
      url += '@';
    }
    url += params.hostname;
    if (params.port) {
      url += `:${params.port}`;
    }
    if (params.path) {
      url += params.path;
    }
    if (params.query) {
      url += `?${params.query}`;
    }
    if (params.hash) {
      url += `#${params.hash}`;
    }

    return url;
  }

  static parseQuery(query) {
    if (!query || !query.length) {return {};}
    return query.split('&').map(keyValue => keyValue.split('=').map(decodeURIComponent)).reduce((result, [key, value]) => {
      if (key in result) {
        if (!Array.isArray(result[key])) {
          result[key] = [result[key]];
        }
        result[key].push(value);
      } else {
        result[key] = value;
      }
      return result;
    }, {});
  }

  static buildQuery(params) {
    return Object.keys(params).reduce((query, key) => {
      if (Array.isArray(params[key])) {
        return query.concat(params[key].map(value => [key, value].map(encodeURIComponent).join('=')));
      }
      return query.concat([key, params[key]].map(encodeURIComponent).join('='));
    }, []).join('&');
  }

  static parsePath(path) {
    return (path ? path.split('/') : []).map(decodeURIComponent).slice(1);
  }

  static buildPath(pathParts) {
    const path = pathParts.map(encodeURIComponent).join('/');
    return `/${path}`;
  }

  constructor(params) {
    if (typeof params !== 'object') {
      params = URI.parse(params);
    }
    this.setParams(params);
  }

  setParams(params) {
    this.protocol = params.protocol;
    this.username = (params.username || false);
    this.password = (params.password || false);
    this.hostname = params.hostname;
    this.port = params.port;
    this.path = params.path;
    this.query = params.query;
    this.hash = params.hash;
  }

  get protocol() {
    return $p(this, PROTOCOL);
  }

  set protocol(value) {
    $p(this, PROTOCOL, value.toLowerCase());
  }

  get username() {
    return $p(this, USERNAME);
  }

  set username(value) {
    $p(this, USERNAME, value);
  }

  get password() {
    return $p(this, PASSWORD);
  }

  set password(value) {
    $p(this, PASSWORD, value);
  }

  get hostname() {
    return $p(this, HOSTNAME);
  }

  set hostname(value) {
    $p(this, HOSTNAME, value);
  }

  get port() {
    return $p(this, PORT);
  }

  set port(value) {
    $p(this, PORT, parseInt(value) || false);
  }

  get host() {
    return `${$p(this, HOSTNAME)}${$p(this, PORT) ? `:${$p(this, PORT)}` : ''}`;
  }

  get origin() {
    return `${this.protocol}://${this.host}`;
  }

  get path() {
    return $p(this, PATH);
  }

  set path(value) {
    value = value || false;
    $p(this, PATH, value);
    $p(this, PATH_PARTS, Object.freeze(URI.parsePath(value)));
  }

  get pathParts() {
    return $p(this, PATH_PARTS);
  }

  set pathParts(value) {
    $p(this, PATH_PARTS, Object.freeze(value));
    $p(this, PATH, URI.buildPath(value));
  }

  get query() {
    return $p(this, QUERY);
  }

  set query(value) {
    value = value || false;
    $p(this, QUERY, value);
    $p(this, QUERY_PARAMS, Object.freeze(URI.parseQuery(value)));
  }

  get queryParams() {
    return $p(this, QUERY_PARAMS);
  }

  set queryParams(value) {
    $p(this, QUERY_PARAMS, Object.freeze(value));
    $p(this, QUERY, URI.buildQuery(value));
  }

  get hash() {
    return $p(this, HASH);
  }

  set hash(value) {
    value = value || false;
    $p(this, HASH, value);
  }

  get href() {
    return URI.build(this);
  }

  toString() {
    return URI.build(this);
  }

  toObject() {
    return {
      protocol: $p(this, PROTOCOL),
      username: $p(this, USERNAME),
      password: $p(this, PASSWORD),
      hostname: $p(this, HOSTNAME),
      port: $p(this, PORT),
      path: $p(this, PATH),
      query: $p(this, QUERY),
      hash: $p(this, HASH),
    };
  }
}
