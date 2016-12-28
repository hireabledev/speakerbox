export const path = 'new';

export function getComponent(nextState, done) {
  return require.ensure(['../../../containers/settings/feeds/new'], (require) => (
    done(null, require('../../../containers/settings/feeds/new').default)
  ));
}
