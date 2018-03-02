export default function navigateTo(history, path) {

  switch (typeof path) {
    case 'string':
      if (history.location.pathname !== path) {
        history.push(path);
      }
      break;
    case 'number':
      if (path === 0) {
        history.replace(history.location.pathname);
      } else {
        history.go(path);
      }
      break;
  }
}
