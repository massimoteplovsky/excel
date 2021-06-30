import { ExcelComponent } from '../core/ExcelComponent';
import { createTableTemplate } from './table.template';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root);
  }
  static className = 'excel__table';
  toHTML() {
    return createTableTemplate(1000);
  }
}
