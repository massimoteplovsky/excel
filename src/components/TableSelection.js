export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass('selected'));
    this.group = [];
  }

  select($el) {
    this.clear();
    $el.addClass('selected').focus();
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass('selected'));
  }
}
