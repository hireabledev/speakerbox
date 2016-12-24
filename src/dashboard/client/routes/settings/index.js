import * as user from './user';
import * as accounts from './accounts';

export const path = 'settings';

export function getComponent(nextState, done) {
  return require.ensure(['../../containers/settings'], (require) => (
    done(null, require('../../containers/settings').default)
  ));
}

export const indexRoute = { onEnter: (nextState, replace) => replace(`${path}/${user.path}`) };

export const childRoutes = [
  user,
  accounts,
];
