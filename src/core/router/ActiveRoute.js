class ActiveRoute {
  path() {
    return window.location.hash.slice(1);
  }

  params() {
    return this.path().split('/').slice(1);
  }
}

export const activeRoute = new ActiveRoute();
