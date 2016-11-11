import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import configureReducer from '../reducers';
import DevTools from '../containers/root/dev-tools';

export default function configureStore({ initialState } = {}) {
  const middleware = [
    thunk,
    createLogger(),
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
