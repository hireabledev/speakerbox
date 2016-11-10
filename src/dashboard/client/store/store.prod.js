import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureReducer from '../reducers';

export default function configureStore({ client, initialState }) {
  const middleware = [
    client.middleware(),
    thunk,
  ];

  const store = createStore(
    configureReducer({
      apollo: client.reducer(),
    }),
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
