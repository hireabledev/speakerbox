export const path = 'stream';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/stream-page'], (require) => (
    done(null, require('../containers/stream-page').default)
  ));
}
