export const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

export const range = (start, end) => {
  if (start > end) [start, end] = [end, start];
  return new Array(end - start + 1).fill(0).map((_, index) => start + index);
};

export const nextSelector = (key, row, col, rowsCount, colsCount) => {
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col = col >= colsCount ? colsCount : col + 1;
      break;
    case 'ArrowLeft':
      col = col > 0 ? col - 1 : 0;
      break;
    case 'ArrowDown':
    case 'Enter':
      row = row >= rowsCount - 1 ? rowsCount - 1 : row + 1;
      break;
    case 'ArrowUp':
      row = row > 0 ? row - 1 : 0;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};
