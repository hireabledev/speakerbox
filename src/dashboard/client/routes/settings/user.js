export const path = 'user';

export function getComponent(nextState, done) {
  return require.ensure(['../../containers/settings/user'], (require) => (
    done(null, require('../../containers/settings/user').default)
  ));
}
