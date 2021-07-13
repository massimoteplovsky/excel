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

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const deepEqual = (a, b) => {
  if (a === b) return true;

  if (
    a === null ||
    typeof a !== 'object' ||
    b === null ||
    typeof b !== 'object'
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
};

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') return deepEqual(a, b);
  return a === b;
};

export const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const parse = (value = '') => {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }

  return value;
};
