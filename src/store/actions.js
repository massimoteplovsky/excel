import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  APPLY_STYLE,
  CHANGE_STYLE,
  CHANGE_TITLE,
} from './types';

export const tableResize = (payload) => {
  return {
    type: TABLE_RESIZE,
    payload,
  };
};

export const changeText = (payload) => {
  return {
    type: CHANGE_TEXT,
    payload,
  };
};

export const changeStyles = (payload) => {
  return {
    type: CHANGE_STYLE,
    payload,
  };
};

export const applyStyle = (payload) => {
  return {
    type: APPLY_STYLE,
    payload,
  };
};

export const changeTableTitle = (payload) => {
  return {
    type: CHANGE_TITLE,
    payload,
  };
};
