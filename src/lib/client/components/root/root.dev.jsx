/* eslint "react/forbid-prop-types": 0 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './dev-tools';

export default function Root({ store, history, routes }) {
  return (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        <DevTools visibleOnLoad={false} />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};
