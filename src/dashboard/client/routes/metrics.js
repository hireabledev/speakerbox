export const path = 'metrics';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/metrics-page'], (require) => (
    done(null, require('../containers/metrics-page').default)
  ));
}
