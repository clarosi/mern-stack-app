import { SET_COLOR } from '../actions/types';

const INITIAL_STATE = { color: 'success' };

const colorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COLOR:
      return Object.assign({}, state, { color: action.payload });
    default:
      return state;
  }
};

export default colorReducer;
