export const path = 'settings';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/settings-page'], (require) => (
    done(null, require('../containers/settings-page').default)
  ));
}
