import Pattern from '@react-steersman/url/Pattern';

export default function matchPath(pathname, { path, ...options }) {
  const pattern = new Pattern(path, options);
  return pattern.match(pathname);
}
