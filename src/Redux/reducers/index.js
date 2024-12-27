import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import graphReducer from './graph';

export default combineReducers({
  user: userReducer,
  graph: graphReducer
});
