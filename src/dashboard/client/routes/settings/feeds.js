export const path = 'feeds';

export function getComponent(nextState, done) {
  return require.ensure(['../../containers/settings/feeds'], (require) => (
    done(null, require('../../containers/settings/feeds').default)
  ));
}
