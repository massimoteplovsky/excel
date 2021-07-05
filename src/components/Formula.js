import { ExcelComponent } from '../core/ExcelComponent';
import { dom } from '../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formulaInput = this.$root.find('.input');

    this.$on('table:selection', (cell) => {
      this.$formulaInput.text(cell.text());
    });

    this.$on('table:input', (cell) => {
      this.$formulaInput.text(cell.text());
    });

    this.$on('table:init', (cell) => {
      this.$formulaInput.text(cell.text());
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    this.$emit('formula:input', dom(e.target).text());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(e.key)) {
      e.preventDefault();

      this.$emit('formula:done');
    }
  }
}
