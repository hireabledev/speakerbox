import App from '../components/app';

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
