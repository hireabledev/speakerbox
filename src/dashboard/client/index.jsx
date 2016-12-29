import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import Root from './components/root';

import './styles.scss';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/dashboard',
});

const store = configureStore({ history: browserHistory });

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
