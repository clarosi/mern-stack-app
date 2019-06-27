import {
  SET_LOADING_STATUS,
  SET_ERROR,
  CLEAR_ERROR
} from '../../store/actions/types';
import { validate, manageValidation, postRequest } from './index';

export const dispatchAction = async ({ dispatch, url, data, method, type }) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: SET_LOADING_STATUS, payload: true });
  let result = await postRequest({ url, data, method });
  dispatch({ type: SET_LOADING_STATUS, payload: false });

  if (result.error) {
    if (result.error.response) {
      const { data, status, statusText } = result.error.response;
      const newResult = { ...result, status, statusText, errorRes: data.error };
      result = newResult;
    }
    return dispatch({ type: SET_ERROR, payload: result });
  }
  if (method === 'PUT') result = data;
  return dispatch({ type, payload: result });
};

export const getNewControls = ({ id, value, newControls }) => {
  const connectedValue = manageValidation({
    key: id,
    value,
    controls: newControls
  });
  const result = validate({
    value,
    connectedValue,
    rules: newControls[id].validationRules
  });

  newControls = {
    ...newControls,
    [id]: {
      ...newControls[id],
      value,
      valid: result[0],
      errMsg: result[1],
      touch: true
    }
  };
  return newControls;
};

export const resetControls = controls => {
  const newControls = { ...controls };
  for (const key in newControls) {
    newControls[key].value = '';
    newControls[key].valid = false;
    newControls[key].touch = false;
  }
  return newControls;
};
