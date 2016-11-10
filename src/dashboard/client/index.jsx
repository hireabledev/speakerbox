import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureClient from './apollo';
import configureStore from './store';
import Root from './containers/root';

import './styles.scss';

const client = configureClient();

const store = configureStore({ client });

const browserHistory = useRouterHistory(createHistory)({
  basename: '/dashboard',
});

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} client={client} history={history} />,
  document.getElementById('root')
);
