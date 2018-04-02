import { object } from 'prop-types';
import navigateTo from './navigateTo';

export default function navigate(path) {
  return (target, key, descriptor) => {

    async function callback(...args) {
      await (descriptor.value || descriptor.initializer.call(this)).apply(this, args);
      if (typeof this.props.steersman !== 'object') {
        throw new Error(`Pleas use HOC withContext for component ${this.constructor.name}`);
      }
      navigateTo(this.props.steersman.history, path);
    }

    return {
      ...descriptor,
      value: callback,
      initializer: function () { return callback.bind(this); },
    };
  };
}
