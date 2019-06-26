import { dispatchAction } from '../../shared/utils';
import { USER_URL } from '../../shared/strings';
import { DO_LOGIN, DO_LOGOUT, DO_SIGNUP, CHECK_AUTH } from './types';

export const checkAuth = () => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `${USER_URL}`,
      method: 'GET',
      data: null,
      type: CHECK_AUTH
    };
    dispatchAction(obj);
  };
};

export const doSignup = userDetails => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `${USER_URL}/signup`,
      data: userDetails,
      type: DO_SIGNUP
    };
    dispatchAction(obj);
  };
};

export const doLogin = credentials => {
  return dispatch => {
    const obj = {
      dispatch,
      url: `${USER_URL}/signin`,
      data: credentials,
      type: DO_LOGIN
    };
    dispatchAction(obj);
  };
};

export const doLogout = () => {
  return dispatch => dispatch({ type: DO_LOGOUT });
};
