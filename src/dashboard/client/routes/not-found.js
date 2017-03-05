export const path = '*';

export function getComponent(nextState, done) {
  return require.ensure(['../components/not-found'], (require) => (
    done(null, require('../components/not-found').default)
  ));
}
