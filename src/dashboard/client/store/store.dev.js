import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';
import DevTools from '../containers/dev-tools';

export default function configureStore(preloadedState) {
  const middleware = [
    thunk,
    createLogger(),
  ];

  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    )
  );

  return store;
}
