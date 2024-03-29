import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} component`
        );
      }
      // т.к. bind() создаёт новую функцию
      this[method] = this[method].bind(this);
      // addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      // addEventListener
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
