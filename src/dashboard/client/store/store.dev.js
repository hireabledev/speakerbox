import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import configureReducer from '../reducers';
import DevTools from '../containers/root/dev-tools';

export default function configureStore({ initialState, history } = {}) {
  const middleware = [
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
