import { SET_ERROR, CLEAR_ERROR } from './types';

export const setError = () => {
  return { type: SET_ERROR };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};
