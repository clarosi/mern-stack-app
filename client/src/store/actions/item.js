import { GET_ITEMS, REMOVE_ITEM } from './types';

export const getItems = () => {
  return { type: GET_ITEMS };
};

export const removeItem = id => {
  return { type: REMOVE_ITEM, payLoad: id };
};
