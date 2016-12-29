import * as user from './user';
import * as accounts from './accounts';
import * as feeds from './feeds';

export const path = 'settings';

export function getComponent(nextState, done) {
  return require.ensure(['../../components/settings'], (require) => (
    done(null, require('../../components/settings').default)
  ));
}

export const indexRoute = {
  onEnter: (nextState, replace) => replace(`${nextState.location.pathname}/${user.path}`),
};

export const childRoutes = [
  user,
  accounts,
  feeds,
];
