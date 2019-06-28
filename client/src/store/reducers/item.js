import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM,
  SET_LOADING_STATUS
} from '../actions/types';

const INITIAL_STATE = { loading: false, items: [] };

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return Object.assign({}, state, { items: action.payload });
    case ADD_ITEM:
      return Object.assign({}, state, {
        items: [action.payload, ...state.items]
      });
    case EDIT_ITEM:
      const editItems = [...state.items];
      editItems[
        state.items.findIndex(item => item._id === action.payload.id)
      ].name = action.payload.name;
      return Object.assign({}, state, { items: editItems });
    case REMOVE_ITEM:
      const removeItems = [...state.items];
      removeItems.splice(
        state.items.findIndex(item => item._id === action.payload._id),
        1
      );
      return Object.assign({}, state, { items: removeItems });
    case SET_LOADING_STATUS:
      return Object.assign({}, state, { loading: action.payload });
    case CLEAR_ITEM:
      return Object.assign({}, state, { ...INITIAL_STATE });
    default:
      return state;
  }
};

export default itemReducer;
