import { capitalize } from '../core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw Error('No root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${capitalize(listener)}`;

      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} component`
        );
      }
      this.method = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${capitalize(listener)}`;
      this.$root.off(listener, this[method]);
    });
  }
}
