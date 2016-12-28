import * as newFeed from './new';
import * as listFeeds from './list';

export const path = 'feeds';

export function getComponent(nextState, done) {
  return require.ensure(['../../../containers/settings/feeds'], (require) => (
    done(null, require('../../../containers/settings/feeds').default)
  ));
}

export const indexRoute = {
  onEnter: (nextState, replace) => replace(`${nextState.location.pathname}/${listFeeds.path}`),
};

export const childRoutes = [
  listFeeds,
  newFeed,
];
