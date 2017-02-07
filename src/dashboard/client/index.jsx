import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from 'lib/client/components/root';
import configureStore from 'lib/client/store';
import configureReducer from './reducers';
import browserHistory from './history';
import routes from './routes';
import './styles.scss';

const store = configureStore({
  configureReducer,
  history: browserHistory,
});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);
