import { TOKEN_NAME } from '../../shared/strings';
import {
  DO_LOGIN,
  DO_LOGOUT,
  DO_SIGNUP,
  CHECK_AUTH,
  SET_LOADING_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  loading: false,
  token: localStorage.getItem(TOKEN_NAME)
};

const login = (state, action) => {
  localStorage.setItem(TOKEN_NAME, action.payload.token);
  return Object.assign({}, state, { user: action.payload });
};

const colorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return login(state, action);
    case DO_LOGOUT:
      localStorage.removeItem(TOKEN_NAME);
      return Object.assign({}, state, { ...INITIAL_STATE });
    case DO_SIGNUP:
      return login(state, action);
    case CHECK_AUTH:
      return Object.assign({}, state, { user: action.payload });
    case SET_LOADING_STATUS:
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }
};

export default colorReducer;
