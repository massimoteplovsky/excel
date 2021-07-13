import { ExcelComponent } from '../core/ExcelComponent';
import { range, nextSelector, parse } from '../core/utils';
import { createTableTemplate } from './table.template';
import { dom } from '../core/dom';
import { TableSelection } from './TableSelection';
import {
  applyStyle,
  changeStyles,
  changeText,
  tableResize,
} from '../store/actions';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'keydown', 'input'],
      ...options,
    });
    this.$root = $root;
    this.rowsCount = 20;
    this.colsCount = 25;
  }

  static className = 'excel__table';

  toHTML() {
    return createTableTemplate(this.rowsCount, this.$getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const selectedCell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select(selectedCell);

    this.$emit('table:selection', selectedCell);
    this.$on('formula:input', (value) => {
      console.log(value);
      this.selection.current.attr('data-value', value);
      this.selection.current.text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:styleChanged', (styles) => {
      this.selection.group.forEach((cell) => cell.css(styles));
      const ids = this.selection.getSelectedIds();
      this.$dispatch(applyStyle({ value: styles, ids }));
    });
  }

  onClick(e) {}

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = dom(e.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const parentCoords = $parent.getCoords();
      const resizerType = $resizer.data.resize;
      const sideProp = resizerType === 'col' ? 'bottom' : 'right';
      let value;

      $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

      document.onmousemove = (docEvt) => {
        if (resizerType === 'col') {
          const delta = Math.floor(docEvt.pageX - parentCoords.right);

          value = parentCoords.width + delta;
          $resizer.css({ right: -delta + 'px' });

          return;
        }

        const delta = Math.floor(docEvt.pageY - parentCoords.bottom);
        value = parentCoords.height + delta;
        $resizer.css({ bottom: -delta + 'px' });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (resizerType === 'col') {
          $parent.css({ width: value + 'px' });
          this.$root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((item) => (item.style.width = value + 'px'));
        }

        if (resizerType === 'row') {
          $parent.css({ height: value + 'px' });
        }

        this.$dispatch(
          tableResize({
            value,
            resizerType,
            id: $parent.data[resizerType],
          })
        );

        $resizer.css({ opacity: 0, bottom: 0, right: 0 });
      };
    }

    if (e.target.dataset.type === 'cell') {
      const $target = dom(e.target);

      if (e.shiftKey) {
        const current = this.selection.current.id(true);
        const target = $target.id(true);
        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);

        const ids = rows.reduce((acc, row) => {
          cols.forEach((col) => {
            acc.push(`${row}:${col}`);
          });
          return acc;
        }, []);

        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
        this.$emit('table:selection', $target);
        this.$dispatch(
          changeStyles(
            $target.getStyles([
              'fontWeight',
              'textDecoration',
              'textAlign',
              'fontStyle',
            ])
          )
        );
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];

    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const { row, col } = this.selection.current.id(true);
      const $next = this.$root.find(
        nextSelector(e.key, row, col, this.rowsCount, this.colsCount)
      );
      this.selection.select($next);
      this.$emit('table:selection', $next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(e) {
    this.updateTextInStore(dom(e.target).text());
  }
}
