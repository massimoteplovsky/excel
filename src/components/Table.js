import { ExcelComponent } from '../core/ExcelComponent';
import { createTableTemplate } from './table.template';
import { dom } from '../core/dom';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, { listeners: ['click', 'mousedown', 'mousemove', 'mouseup'] });
    this.$root = $root;
  }

  static className = 'excel__table';

  toHTML() {
    return createTableTemplate(20);
  }

  onClick() {
    console.log('onClick');
  }

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

        $resizer.css({ opacity: 0, bottom: 0, right: 0 });
      };
    }
  }

  onMousemove() {
    console.log('onMousemove');
  }

  onMouseup() {
    console.log('onMouseup');
  }
}
