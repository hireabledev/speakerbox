export const path = 'schedule';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/schedule'], (require) => (
    done(null, require('../containers/schedule').default)
  ));
}
