import App from '../containers/app';

import * as stream from './stream';

export default {
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: [
      stream,
    ],
  }],
};
