import raven from 'raven';
import { ENV, SENTRY_DSN, VERSION } from './config';
import { sentry as debug } from './debug';

function noopMiddleware(req, res, next) {
  next();
}

function errorMiddleware(err) {
  debug.error(err);
  throw err;
}

const mockRaven = {
  config() {},
  install() {},
  captureException(err) { debug.error(err); },
  requestHandler() {
    return noopMiddleware;
  },
  errorHandler() {
    return errorMiddleware;
  },
};

const Raven = SENTRY_DSN ? raven : mockRaven;

const tags = {};

if (process.env.HEROKU_APP_ID) {
  tags.HEROKU_APP_ID = process.env.HEROKU_APP_ID;
}

if (process.env.HEROKU_DYNO_ID) {
  tags.HEROKU_DYNO_ID = process.env.HEROKU_DYNO_ID;
}

if (process.env.HEROKU_RELEASE_CREATED_AT) {
  tags.HEROKU_RELEASE_CREATED_AT = process.env.HEROKU_RELEASE_CREATED_AT;
}

if (process.env.HEROKU_RELEASE_VERSION) {
  tags.HEROKU_RELEASE_VERSION = process.env.HEROKU_RELEASE_VERSION;
}

Raven.config(SENTRY_DSN, {
  environment: ENV,
  release: VERSION,
  tags,
});

export default Raven;

export const sentryRequestMiddleware = Raven.requestHandler();

export const sentryErrorMiddleware = Raven.errorHandler();
