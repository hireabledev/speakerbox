import App from '../containers/app';

import * as stream from './stream';
import * as schedule from './schedule';
import * as metrics from './metrics';
import * as settings from './settings';

export default {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace(stream.path) },
    childRoutes: [
      stream,
      schedule,
      metrics,
      settings,
    ],
  }],
};
