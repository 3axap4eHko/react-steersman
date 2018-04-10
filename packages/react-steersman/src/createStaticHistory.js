import { createLocation, createPath } from 'history';

function handler(action) {
  return location => {
    throw {
      action,
      url: createLocation(location),
    };
  };
}

export default function createStaticHistory(options) {
  const { location } = options;

  return {
    action: 'POP',
    location: createLocation(location),
    createHref(location) {
      return typeof location === 'string' ? location : createPath(location);
    },
    push: handler('PUSH'),
    replace: handler('REPLACE'),
    go: handler('GO'),
    goBack: handler('BACK'),
    goForward: handler('FORWARD'),
    listen() {},
    block() {},
  };
}