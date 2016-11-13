import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import configureReducer from '../reducers';

export default function configureStore({ initialState, history } = {}) {
  const middleware = [
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
