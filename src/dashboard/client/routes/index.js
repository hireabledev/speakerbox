import App from '../components/app';

export default {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace('schedule') },
    childRoutes: [
      {
        path: 'stream',
        getComponent: (nextState, done) => {
          require.ensure(['../components/stream'], (require) => (
            done(null, require('../components/stream').default)
          ));
        },
      },
      {
        path: 'favorites',
        getComponent: (nextState, done) => {
          require.ensure(['../components/stream'], (require) => (
            done(null, require('../components/stream').default)
          ));
        },
      },
      {
        path: 'schedule',
        getComponent: (nextState, done) => {
          require.ensure(['../components/schedule'], (require) => (
            done(null, require('../components/schedule').default)
          ));
        },
      },
      {
        path: 'metrics',
        getComponent: (nextState, done) => {
          require.ensure(['../components/metrics'], (require) => (
            done(null, require('../components/metrics').default)
          ));
        },
      },
      {
        path: 'settings',
        getComponent: (nextState, done) => {
          require.ensure(['../components/settings'], (require) => (
            done(null, require('../components/settings').default)
          ));
        },
        indexRoute: {
          onEnter: (nextState, replace) => replace(`${nextState.location.pathname}/user`),
        },
        childRoutes: [
          {
            path: 'user',
            getComponent: (nextState, done) => {
              require.ensure(['../components/settings-user'], (require) => (
                done(null, require('../components/settings-user').default)
              ));
            },
          },
          {
            path: 'accounts',
            getComponent: (nextState, done) => {
              require.ensure(['../components/settings-accounts'], (require) => (
                done(null, require('../components/settings-accounts').default)
              ));
            },
          },
          {
            path: 'feeds',
            getComponent: (nextState, done) => {
              require.ensure(['../components/settings-feeds'], (require) => (
                done(null, require('../components/settings-feeds').default)
              ));
            },
            indexRoute: {
              onEnter: (nextState, replace) => replace(`${nextState.location.pathname}/list`),
            },
            childRoutes: [
              {
                path: 'list',
                getComponent: (nextState, done) => {
                  require.ensure(['../components/settings-feeds-list'], (require) => (
                    done(null, require('../components/settings-feeds-list').default)
                  ));
                },
              },
              {
                path: 'new',
                getComponent: (nextState, done) => {
                  require.ensure(['../components/settings-feeds-new'], (require) => (
                    done(null, require('../components/settings-feeds-new').default)
                  ));
                },
              },
            ],
          },
        ],
      },
      {
        path: '*',
        getComponent: (nextState, done) => {
          require.ensure(['../components/not-found'], (require) => (
            done(null, require('../components/not-found').default)
          ));
        },
      },
    ],
  }],
};
