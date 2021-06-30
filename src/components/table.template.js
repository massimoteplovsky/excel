const Codes = {
  START: 65,
  END: 90,
};

const createCell = () => {
  return `<div class="cell" contenteditable></div>`;
};

const createCol = (item) => {
  return `
      <div class="column">
        ${item}
      </div>
    `;
};

const createRow = (index, content) => {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
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
    const cells = new Array(colCount).fill('').map(createCell).join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
};
