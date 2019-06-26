import { SET_LOADING_STATUS } from '../../store/actions/types';
import { validate, manageValidation, postRequest } from './index';

export const dispatchAction = async ({ dispatch, url, data, method, type }) => {
  dispatch({ type: SET_LOADING_STATUS, payload: true });
  let result = await postRequest({ url, data, method });
  dispatch({ type: SET_LOADING_STATUS, payload: false });
  if (result.error) return result.error;
  if (method === 'PUT') result = data;
  return dispatch({ type, payload: result });
};

export const getNewControls = ({ id, value, newControls }) => {
  const connectedValue = manageValidation({
    key: id,
    value,
    controls: newControls
  });
  newControls = {
    ...newControls,
    [id]: {
      ...newControls[id],
      value,
      valid: validate(value, newControls[id].validationRules, connectedValue),
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
