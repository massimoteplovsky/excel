const Codes = {
  START: 65,
  END: 90,
};

const createCell = (rowIndex, colIndex) => {
  return `<div 
            class="cell" 
            contenteditable 
            data-col="${colIndex}" 
            data-type="cell"
            data-id="${rowIndex}:${colIndex}">
          </div>`;
};

const createCol = (item, colIndex) => {
  return `
      <div class="column" data-type="resizable" data-col="${colIndex}">
        ${item}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
};

const createRow = (index, content) => {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${index && '<div class="row-resize" data-resize="row"></div>'}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `;
};

export const createTableTemplate = (rowCount = 15) => {
  const colCount = Codes.END - Codes.START + 1;
  const rows = [];
  const cols = new Array(colCount)
    .fill('')
    .map((_, index) => String.fromCharCode(Codes.START + index))
    .map(createCol)
    .join('');

  rows.push(createRow('', cols));

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colCount)
      .fill('')
      .map((_, col) => createCell(i, col))
      .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
};
