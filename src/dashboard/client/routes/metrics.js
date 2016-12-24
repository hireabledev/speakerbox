export const path = 'metrics';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/metrics'], (require) => (
    done(null, require('../containers/metrics').default)
  ));
}
