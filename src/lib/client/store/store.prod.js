import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import fetchMiddleware from './middleware/fetch';

export default function configureStore({ initialState, history, reducer } = {}) {
  const middleware = [
    fetchMiddleware(),
    thunk,
    routerMiddleware(history),
  ];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
