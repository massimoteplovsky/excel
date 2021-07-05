class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  clear() {
    this.toHTML('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':');
      return {
        row: parseInt(row, 10),
        col: parseInt(col, 10),
      };
    }
    return this.data.id;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  }

  closest(selector) {
    return dom(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return dom(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  css(styles = {}) {
    const stylesString = Object.entries(styles)
      .map(([rule, property]) => `${rule}: ${property};`)
      .join(' ');

    this.$el.style.cssText += stylesString;
  }

  get data() {
    return this.$el.dataset;
  }
}

export const dom = (selector) => {
  return new Dom(selector);
};

dom.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return dom(el);
};
