export const path = 'new';

export function getComponent(nextState, done) {
  return require.ensure(['../../../components/settings-feeds-new'], (require) => (
    done(null, require('../../../components/settings-feeds-new').default)
  ));
}
