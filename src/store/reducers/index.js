import { combineReducers } from 'redux';
import halfReducer from './halfReducer';
import linkReducer from './linkReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  halfState: halfReducer,
  linkState: linkReducer,
  appState: appReducer
});

export default rootReducer;
