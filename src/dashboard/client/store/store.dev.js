import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import configureReducer from '../reducers';
import DevTools from '../containers/dev-tools';

export default function configureStore({ client, initialState }) {
  const middleware = [
    client.middleware(),
    thunk,
    createLogger(),
  ];

  const store = createStore(
    configureReducer({
      apollo: client.reducer(),
    }),
    initialState,
    compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    )
  );

  return store;
}
