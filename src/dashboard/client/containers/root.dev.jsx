/* eslint "react/forbid-prop-types": 0 */

import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';
import routes from '../routes';
import DevTools from './dev-tools';

export default function Root({ store, client, history }) {
  return (
    <ApolloProvider store={store} client={client}>
      <div>
        <Router history={history} routes={routes} />
        <DevTools visibleOnLoad={false} />
      </div>
    </ApolloProvider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
