import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore(preloadedState) {
  const middleware = [
    thunk,
  ];

  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
}