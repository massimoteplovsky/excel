import { dom } from '../dom';
import { activeRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error('Selector is not provided');
    }

    this.$selector = dom(selector);
    this.routes = routes;
    this.page = null;

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePage);
    this.changePage();
  }

  changePage() {
    if (this.page) {
      this.page.destroy();
    }

    this.$selector.clear();

    const [route] = activeRoute.path().split('/');

    const Page = this.routes[route]
      ? this.routes[route]
      : this.routes['notFound'];

    this.page = new Page(activeRoute.params());

    this.$selector.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage);
  }
}
