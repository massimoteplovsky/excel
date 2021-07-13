import { ExcelComponent } from '../core/ExcelComponent';
import { dom } from '../core/dom';
import { changeTableTitle } from '../store/actions';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }
  static className = 'excel__header';

  onInput(e) {
    const target = dom(e.target);
    this.$dispatch(changeTableTitle(target.text()));
  }

  toHTML() {
    return `
        <input type="text" class="input" value=${this.$getState().title} />

        <div>
            <div class="button">
            <i class="material-icons">delete</i>
            </div>

            <div class="button">
            <i class="material-icons">exit_to_app</i>
            </div>
        </div>
    `;
  }
}
