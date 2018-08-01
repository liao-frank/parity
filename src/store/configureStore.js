import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
const loggerMiddleware = createLogger();

let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  );
}
else {
  middleware = applyMiddleware(
    thunkMiddleware
  );
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    middleware
  );
};
