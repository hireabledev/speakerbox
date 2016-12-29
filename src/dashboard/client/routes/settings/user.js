export const path = 'user';

export function getComponent(nextState, done) {
  return require.ensure(['../../components/settings-user'], (require) => (
    done(null, require('../../components/settings-user').default)
  ));
}
