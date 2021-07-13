import { parse } from '../core/utils';

const Codes = {
  START: 65,
  END: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) => {
  return (state.column[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state, index) => {
  return (state.row[index] || DEFAULT_HEIGHT) + 'px';
};

const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

const createCell = (rowIndex, colIndex, width, cellValue, cellStyle) => {
  const styleString = Object.entries(cellStyle)
    .map(([property, value]) => camelToDashCase(`${property}:${value};`))
    .join(' ');

  return `<div
            class="cell"
            contenteditable
            data-col="${colIndex}"
            data-type="cell"
            data-id="${rowIndex}:${colIndex}"
            data-value="${cellValue}"
            style="width: ${width};text-align: left;${styleString}"
          >
            ${parse(cellValue)}
          </div>`;
};

const createCol = (item, colIndex, width) => {
  return `
      <div 
        class="column" 
        data-type="resizable" 
        data-col="${colIndex}" 
        style="width: ${width}"
    >
        ${item}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
};

const createRow = (index, content, height) => {
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height: ${height}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${index && '<div class="row-resize" data-resize="row"></div>'}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `;
};

export const createTableTemplate = (rowCount = 15, state = {}) => {
  const colCount = Codes.END - Codes.START + 1;
  const rows = [];
  const cols = new Array(colCount)
    .fill('')
    .map((_, index) => String.fromCharCode(Codes.START + index))
    .map((col, index) => {
      const width = getWidth(state, index);
      return createCol(col, index, width);
    })
    .join('');

  rows.push(createRow('', cols));

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colCount)
      .fill('')
      .map((_, col) => {
        const width = getWidth(state, col);
        const cellValue = state.data[`${i}:${col}`] || '';
        const cellSstyle = state.cellStyle[`${i}:${col}`] || '';
        return createCell(i, col, width, cellValue, cellSstyle);
      })
      .join('');
    const height = getHeight(state, i + 1);
    rows.push(createRow(i + 1, cells, height));
  }
  return rows.join('');
};
