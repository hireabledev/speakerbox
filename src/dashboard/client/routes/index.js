import App from '../components/app';

import * as stream from './stream';
import * as favorites from './favorites';
import * as schedule from './schedule';
import * as metrics from './metrics';
import * as settings from './settings';

export default {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace(schedule.path) },
    childRoutes: [
      stream,
      favorites,
      schedule,
      metrics,
      settings,
    ],
  }],
};
