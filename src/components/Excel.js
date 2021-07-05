import { dom } from '../core/dom';
import { Emitter } from '../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = dom(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = dom.create('div', 'excel');
    const componentOptions = { emitter: new Emitter() };
    this.components = this.components.map((Component) => {
      const $el = dom.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
