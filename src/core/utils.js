export const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};
