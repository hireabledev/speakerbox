export const path = 'list';

export function getComponent(nextState, done) {
  return require.ensure(['../../../components/settings-feeds-list'], (require) => (
    done(null, require('../../../components/settings-feeds-list').default)
  ));
}
