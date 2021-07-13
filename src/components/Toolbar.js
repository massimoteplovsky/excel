import { ExcelStateComponent } from '../core/ExcelStateComponent';
import { createToolbarTemplate } from './toolbar.template';
import { dom } from '../core/dom';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      stateProps: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    const initialState = {
      fontWeight: 'normal',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles);
  }

  get template() {
    return createToolbarTemplate(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(e) {
    const $target = dom(e.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:styleChanged', value);
      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
    }
  }
}
