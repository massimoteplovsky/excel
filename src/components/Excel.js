import { dom } from '../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = dom(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = dom.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $el = dom.create('div', Component.className);
      const component = new Component($el);
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
}
