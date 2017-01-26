/* eslint global-require: 0, 'import/no-extraneous-dependencies': 0 */

import 'isomorphic-fetch';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import kue from 'kue';
import basicAuth from 'basic-auth-connect';

import {
  ENV,
  PORT,
  KUE_USER,
  KUE_PWD,
  SECRET,
  STATIC_URL,
  LETS_ENCRYPT_URL,
  LETS_ENCRYPT_KEY,
} from './lib/config';
import { server as debug } from './lib/debug';
import models, { sequelize } from './lib/models';
import { sentryRequestMiddleware, sentryErrorMiddleware } from './lib/sentry';
import session from './lib/session';
import passport from './lib/passport';
import templateContext from './lib/middleware/template-context';
import notFound from './lib/middleware/not-found';
import errorHandler from './lib/middleware/error-handler';

// Apps
import api from './api';
import dashboard from './dashboard';
import marketing from './marketing';
import sso from './sso';

const app = express();

kue.app.set('title', 'Job Queue - Speaker Box');

// Logs
app.use(sentryRequestMiddleware);
app.use(morgan('combined'));

// Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));

// Middleware
app.use(compression());
app.use(session(sequelize));
app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

if (ENV === 'production') {
  // Force HTTPS
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https' && req.path !== `/${LETS_ENCRYPT_URL}`) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  });
}

app.use(STATIC_URL, express.static(`${__dirname}/assets`));

if (ENV === 'development') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config');

  webpackConfig.watch = true;
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackMiddleware(webpackCompiler, {
    stats: { colors: true },
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
  }));
} else {
  const webpackStats = require('./lib/webpack.stats.json');

  app.use(STATIC_URL, express.static(`${__dirname}/public`, { maxAge: '30d' }));
  app.use((req, res, next) => {
    res.locals.webpackStats = webpackStats;
    next();
  });
}

if (LETS_ENCRYPT_URL && LETS_ENCRYPT_KEY) {
  app.get(`/${LETS_ENCRYPT_URL}`, (req, res) => res.send(LETS_ENCRYPT_KEY));
}

app.use(templateContext);

app.use('/api', api);
app.use('/dashboard', dashboard);
app.use('/kue', basicAuth(KUE_USER, KUE_PWD), kue.app);
app.use('/sso', sso);
app.use('/', marketing);

const apps = [app, api, dashboard, marketing, sso];

apps.forEach(application => {
  /* eslint no-param-reassign: 0 */
  application.models = models;
  application.sequelize = sequelize;
  application.disable('x-powered-by');

  // use sub application rendering engine
  application.use(notFound);
  application.use(sentryErrorMiddleware);
  application.use(errorHandler);
});

Promise.all([
  sequelize.sync(),
])
  .then((/* result */) => {
    app.listen(PORT);
    debug.info(`Server started at http://localhost:${PORT}`);
  })
  .catch(err => {
    debug.error(err.stack || err);
  });

process.on('exit', () => {
  debug.warn('Waiting for connections to complete...');
  const timer = setTimeout(() => {
    debug.error('Failed to close connections within timeout.');
    process.exit(1);
  }, 5000);
  app.close(() => {
    debug.warn('Closed all connections.');
    clearTimeout(timer);
    process.exit();
  });
});

export default app;
