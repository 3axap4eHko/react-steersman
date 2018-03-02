import { object } from 'prop-types';
import navigateTo from './navigateTo';

export default function navigate(path) {
  return (target, key, descriptor) => {

    const Component = target.constructor;
    if (!Component.contextTypes) {
      Component.contextTypes = {};
    }
    Component.contextTypes.history = object;

    async function callback(...args) {
      await (descriptor.value || descriptor.initializer.call(this)).apply(this, args);
      navigateTo(this.context.history, path);
    }

    return {
      ...descriptor,
      value: callback,
      initializer: function () { return callback.bind(this); },
    };
  };
}
