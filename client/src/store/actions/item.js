import { postRequest } from '../../shared/utils';
import { ITEM_URL } from '../../shared/strings';
import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  SET_LOADING_STATUS
} from './types';

const dispatchAction = async ({ dispatch, url, data, method, type }) => {
  dispatch({ type: SET_LOADING_STATUS, payload: true });
  let result = await postRequest(url, data, method);
  dispatch({ type: SET_LOADING_STATUS, payload: false });
  if (result.error) return result.error;
  if (method === 'PUT') result = data;
  return dispatch({ type, payload: result });
};

export const getItems = () => {
  return dispatch => {
    const obj = {
      dispatch,
      url: ITEM_URL,
      data: null,
      method: 'GET',
      type: GET_ITEMS
    };
    dispatchAction(obj);
  };
};

export const addItem = item => {
  return dispatch => {
    const obj = { dispatch, url: ITEM_URL, data: item, type: ADD_ITEM };
    dispatchAction(obj);
  };
};

export const editItem = item => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `${ITEM_URL}/${item.id}`,
      data: item,
      method: 'PUT',
      type: EDIT_ITEM
    };
    dispatchAction(obj);
  };
};

export const removeItem = id => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `${ITEM_URL}/${id}`,
      data: null,
      method: 'DELETE',
      type: REMOVE_ITEM
    };
    dispatchAction(obj);
  };
};
