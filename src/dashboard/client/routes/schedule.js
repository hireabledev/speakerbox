export const path = 'schedule';

export function getComponent(nextState, done) {
  return require.ensure(['../components/schedule'], (require) => (
    done(null, require('../components/schedule').default)
  ));
}
