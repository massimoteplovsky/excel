import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE,
  CHNAGE_DATE,
} from './types';

export const rootReducer = (state, { type, payload = null }) => {
  switch (type) {
    case TABLE_RESIZE:
      return payload.resizerType === 'col'
        ? {
            ...state,
            column: { ...state.column, [payload.id]: payload.value },
          }
        : {
            ...state,
            row: { ...state.row, [payload.id]: payload.value },
          };
    case CHANGE_TEXT:
      return {
        ...state,
        text: payload.value,
        data: { ...state.data, [payload.id]: payload.value },
      };
    case CHANGE_STYLE:
      return { ...state, currentStyles: payload };
    case APPLY_STYLE:
      // eslint-disable-next-line no-case-declarations
      const cells = payload.ids.reduce((acc, id) => {
        state['cellStyle'][id]
          ? (acc[id] = { ...state['cellStyle'][id], ...payload.value })
          : (acc[id] = payload.value);

        return acc;
      }, {});

      return { ...state, cellStyle: { ...state.cellStyle, ...cells } };
    case CHANGE_TITLE:
      return { ...state, title: payload };
    case CHNAGE_DATE:
      return { ...state, date: Date.now() };
    default:
      return state;
  }
};
