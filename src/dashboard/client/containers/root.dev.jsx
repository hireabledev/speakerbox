/* eslint "react/forbid-prop-types": 0 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import ThemeProvider from './theme';
import DevTools from './dev-tools';

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <Router history={history} routes={routes} />
          <DevTools visibleOnLoad={false} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
