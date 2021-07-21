export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw Error('Method getRoot should be implemented');
  }

  afterRender() {}

  destroy() {}
}
