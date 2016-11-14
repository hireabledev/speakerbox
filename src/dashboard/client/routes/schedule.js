export const path = 'schedule';

export function getComponent(nextState, done) {
  return require.ensure(['../containers/schedule-page'], (require) => (
    done(null, require('../containers/schedule-page').default)
  ));
}
