const registry = new WeakMap();

/**
 * Private scope function
 * @param context
 * @param args
 * @returns {any}
 */
export function $p(context, ...args) {
  if (!registry.has(context)) {
    registry.set(context, new Map());
  }
  const scopeMap = registry.get(context);

  if (args.length === 2) {
    return scopeMap.set(...args);
  } else if (args.length === 1) {
    return scopeMap.get(...args);
  } else if (args.length === 0) {
    return scopeMap;
  }
  throw new Error(`Private scope storage called with wrong count of arguments: ${arguments.length}`);
}
