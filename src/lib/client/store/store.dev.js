import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import fetchMiddleware from './middleware/fetch';
import DevTools from '../components/root/dev-tools';

export default function configureStore({ initialState, history, reducer } = {}) {
  if (typeof reducer !== 'function') {
    throw new Error('Cannot configure store. Missing root reducer.');
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
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    )
  );

  return store;
}
