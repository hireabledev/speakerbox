export const path = 'metrics';

export function getComponent(nextState, done) {
  return require.ensure(['../components/metrics'], (require) => (
    done(null, require('../components/metrics').default)
  ));
}
