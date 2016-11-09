/* eslint "react/forbid-prop-types": 0 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ThemeProvider from './theme';
import routes from '../routes';

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};