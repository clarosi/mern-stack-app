import { combineReducers } from 'redux';

import itemReducer from './item';
import colorReducer from './color';

const rootReducer = combineReducers({ item: itemReducer, color: colorReducer });

export default rootReducer;
