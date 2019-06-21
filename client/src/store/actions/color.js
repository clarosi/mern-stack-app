import { SET_COLOR } from './types';

export const setColor = color => {
  return { type: SET_COLOR, payload: color };
};
