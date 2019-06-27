import { combineReducers } from 'redux';

import itemReducer from './item';
import colorReducer from './color';
import authReducer from './auth';
import errorReducer from './error';

const rootReducer = combineReducers({
  item: itemReducer,
  color: colorReducer,
  auth: authReducer,
  error: errorReducer
});

export default rootReducer;
