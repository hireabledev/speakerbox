import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import fetchMiddleware from './middleware/fetch';
import DevTools from '../components/root/dev-tools';

export default function configureStore({ initialState, history, configureReducer } = {}) {
  if (typeof configureReducer !== 'function') {
    throw new Error('Cannot configure store. Missing configureReducer function.');
  }

  const middleware = [
    fetchMiddleware(),
    thunk,
    routerMiddleware(history),
    createLogger({
      collapsed: true,
    }),
  ];

  const store = createStore(
    configureReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    )
  );

  return store;
}
