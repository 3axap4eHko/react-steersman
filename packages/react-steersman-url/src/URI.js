const urlParseExpr = /^(\w+):\/\/((.*?)(:(.*?))?@)?(.*?)(:(\d+))?(\/.*?)(\?(.*?))?(#(.*))?$/;

const _protocol = Symbol('protocol');
const _username = Symbol('username');
const _password = Symbol('password');
const _hostname = Symbol('hostname');
const _port = Symbol('port');
const _path = Symbol('path');
const _pathParts = Symbol('pathParts');
const _query = Symbol('query');
const _queryParams = Symbol('queryParams');
const _hash = Symbol('hash');

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
    return this[_protocol];
  }

  set protocol(value) {
    this[_protocol] = value.toLowerCase();
  }

  get username() {
    return this[_username];
  }

  set username(value) {
    this[_username] = value;
  }

  get password() {
    return this[_password];
  }

  set password(value) {
    this[_password] = value;
  }

  get hostname() {
    return this[_hostname];
  }

  set hostname(value) {
    this[_hostname] = value;
  }

  get port() {
    return this[_port];
  }

  set port(value) {
    this[_port] = parseInt(value) || false;
  }

  get host() {
    return `${this[_hostname]}${this[_port] ? `:${this[_port]}` : ''}`;
  }

  get origin() {
    return `${this.protocol}://${this.host}`;
  }

  get path() {
    return this[_path];
  }

  set path(value) {
    value = value || false;
    this[_path] = value;
    this[_pathParts] = Object.freeze(URI.parsePath(value));
  }

  get pathParts() {
    return this[_pathParts];
  }

  set pathParts(value) {
    this[_pathParts] = Object.freeze(value);
    this[_path] = URI.buildPath(value);
  }

  get query() {
    return this[_query];
  }

  set query(value) {
    value = value || false;
    this[_query] = value;
    this[_queryParams] = Object.freeze(URI.parseQuery(value));
  }

  get queryParams() {
    return this[_queryParams];
  }

  set queryParams(value) {
    this[_queryParams] = Object.freeze(value);
    this[_query] = URI.buildQuery(value);
  }

  get hash() {
    return this[_hash];
  }

  set hash(value) {
    value = value || false;
    this[_hash] = value;
  }

  get href() {
    return URI.build(this);
  }

  toString() {
    return URI.build(this);
  }

  toObject() {
    return {
      protocol: this[_protocol],
      username: this[_username],
      password: this[_password],
      hostname: this[_hostname],
      port: this[_port],
      path: this[_path],
      query: this[_query],
      hash: this[_hash],
    };
  }
}
