import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import fetchMiddleware from './middleware/fetch';

export default function configureStore({ initialState, history, configureReducer } = {}) {
  const middleware = [
    fetchMiddleware(),
    thunk,
    routerMiddleware(history),
  ];

  const store = createStore(
    configureReducer(),
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
