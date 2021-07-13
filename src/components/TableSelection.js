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

  getSelectedIds() {
    return this.group.map((cell) => cell.data.id);
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass('selected'));
  }
}
