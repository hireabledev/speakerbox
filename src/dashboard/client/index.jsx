import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import Root from './components/root';
import browserHistory from './history';
import './styles.scss';

const store = configureStore({ history: browserHistory });
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
