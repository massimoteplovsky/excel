import { ExcelComponent } from '../core/ExcelComponent';
import { dom } from '../core/dom';
import { changeTableTitle, changeDate } from '../store/actions';
import { storage } from '../core/utils';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
    this.params = options.params;
  }
  static className = 'excel__header';

  saveStore() {
    storage(`excel:${this.params[0]}`, this.$getState());
  }

  deleteTable() {
    localStorage.removeItem(`excel:${this.params[0]}`);
  }

  onInput(e) {
    const target = dom(e.target);
    this.$dispatch(changeTableTitle(target.text()));
  }

  onClick(e) {
    const button = dom(e.target).data.type;

    switch (button) {
      case 'save':
        this.$dispatch(changeDate());
        return this.saveStore();
      case 'exit':
        window.location.hash = '';
        break;
      case 'delete':
        this.deleteTable();
        window.location.hash = '';
        break;
      default:
        return;
    }
  }

  toHTML() {
    return `
        <input type="text" class="input" value="${this.$getState().title}" />
        <div>
            <div class="button" data-type="save">
                <i class="material-icons" data-type="save">save</i>
            </div>
            <div class="button" data-type="delete">
                <i class="material-icons" data-type="delete">delete</i>
            </div>

            <div class="button" data-type="exit">
                <i class="material-icons" data-type="exit">exit_to_app</i>
            </div>
        </div>
    `;
  }
}
