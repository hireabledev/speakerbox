export const path = 'list';

export function getComponent(nextState, done) {
  return require.ensure(['../../../containers/settings/feeds/list'], (require) => (
    done(null, require('../../../containers/settings/feeds/list').default)
  ));
}
