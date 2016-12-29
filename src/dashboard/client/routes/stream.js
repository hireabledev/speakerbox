export const path = 'stream';

export function getComponent(nextState, done) {
  return require.ensure(['../components/stream'], (require) => (
    done(null, require('../components/stream').default)
  ));
}
