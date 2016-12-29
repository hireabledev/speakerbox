export const path = 'favorites';

export function getComponent(nextState, done) {
  return require.ensure(['../components/stream'], (require) => (
    done(null, require('../components/stream').default)
  ));
}
