import { combineReducers } from 'redux';
import halfReducer from './halfReducer';
import linkReducer from './linkReducer';

const rootReducer = combineReducers({
  halfReducer,
  linkReducer
});

export default rootReducer;
