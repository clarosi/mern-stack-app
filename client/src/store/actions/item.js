import { postRequest } from '../../shared/utils';
import { GET_ITEMS, ADD_ITEM, REMOVE_ITEM, SET_LOADING_STATUS } from './types';

const dispatchAction = async ({ dispatch, url, data, method, type }) => {
  dispatch({ type: SET_LOADING_STATUS, payload: true });
  const result = await postRequest(url, data, method);
  dispatch({ type: SET_LOADING_STATUS, payload: false });
  if (result.error) return;
  return dispatch({ type, payload: result });
};

export const getItems = () => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `api/items`,
      data: null,
      method: 'GET',
      type: GET_ITEMS
    };
    dispatchAction(obj);
  };
};

export const addItem = item => {
  return dispatch => {
    const obj = { dispatch, url: `api/items`, data: item, type: ADD_ITEM };
    dispatchAction(obj);
  };
};

export const removeItem = id => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `api/items/${id}`,
      data: null,
      method: 'DELETE',
      type: REMOVE_ITEM
    };
    dispatchAction(obj);
  };
};
