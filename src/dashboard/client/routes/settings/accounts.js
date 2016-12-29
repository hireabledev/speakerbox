export const path = 'accounts';

export function getComponent(nextState, done) {
  return require.ensure(['../../components/settings-accounts'], (require) => (
    done(null, require('../../components/settings-accounts').default)
  ));
}
