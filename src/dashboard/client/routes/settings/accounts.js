export const path = 'accounts';

export function getComponent(nextState, done) {
  return require.ensure(['../../containers/settings/accounts'], (require) => (
    done(null, require('../../containers/settings/accounts').default)
  ));
}
