import { SET_ERROR, CLEAR_ERROR } from '../actions/types';

const INITIAL_STATE = { isError: false, errorMsg: '', statusCode: 0 };

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, {
        isError: true,
        errorMsg: action.payload.errorRes
          ? action.payload.errorRes
          : action.payload.error.message,
        statusCode: action.payload.status ? action.payload.status : 0
      });
    case CLEAR_ERROR:
      return Object.assign({}, state, { ...INITIAL_STATE });
    default:
      return state;
  }
};

export default errorReducer;
