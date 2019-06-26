import { combineReducers } from 'redux';

import itemReducer from './item';
import colorReducer from './color';
import authReducer from './auth';

const rootReducer = combineReducers({
  item: itemReducer,
  color: colorReducer,
  auth: authReducer
});

export default rootReducer;
