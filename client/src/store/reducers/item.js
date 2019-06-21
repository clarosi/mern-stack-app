import {
  GET_ITEMS,
  ADD_ITEM,
  REMOVE_ITEM,
  SET_LOADING_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  items: []
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return Object.assign({}, state, { items: action.payload });
    case ADD_ITEM:
      return Object.assign({}, state, {
        items: [action.payload, ...state.items]
      });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        items: state.items.filter(item => item._id !== action.payload._id)
      });
    case SET_LOADING_STATUS:
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }
};

export default itemReducer;
