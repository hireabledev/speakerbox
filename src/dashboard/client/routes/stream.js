export const path = 'stream';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/stream'], (require) => (
    done(null, require('../containers/stream').default)
  ));
}
