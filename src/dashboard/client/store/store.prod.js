import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import fetchMiddleware from './middleware/fetch';
import configureReducer from '../reducers';

export default function configureStore({ initialState, history } = {}) {
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
