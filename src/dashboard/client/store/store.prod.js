import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureReducer from '../reducers';

export default function configureStore({ initialState } = {}) {
  const middleware = [
    thunk,
  ];

  const store = createStore(
    configureReducer(),
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
