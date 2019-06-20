import uuid from 'uuid';

import {
  GET_ITEMS,
  REMOVE_ITEM,
  ADD_ITEM_STARTS,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  items: [
    { id: uuid(), name: 'Ian' },
    { id: uuid(), name: 'Lorlyn' },
    { id: uuid(), name: 'Zyrus' },
    { id: uuid(), name: 'Zianna' }
  ]
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return Object.assign({}, state);
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== action.payLoad)
      });
    case ADD_ITEM_STARTS:
      return Object.assign({}, state, { isLoading: true });
    case ADD_ITEM_SUCCESS:
      return Object.assign({}, state, { isLoading: false });
    case ADD_ITEM_FAILED:
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};

export default itemReducer;
