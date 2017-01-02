import raven from 'raven';
import { ENV, SENTRY_DSN } from './config';
import { sentry as debug } from './debug';

const mockSentry = {
  patchGlobal() {},
  captureException(err) { debug.error(err); },
};

function mockSentryMiddleware(req, res, next) {
  next();
}

const sentry = new raven.Client(SENTRY_DSN, {
  environment: ENV,
});

export default SENTRY_DSN ? sentry : mockSentry;

export const sentryRequestMiddleware = SENTRY_DSN
  ? raven.middleware.express.requestHandler(SENTRY_DSN)
  : mockSentryMiddleware;

export const sentryErrorMiddleware = SENTRY_DSN
  ? raven.middleware.express.errorHandler(SENTRY_DSN)
  : mockSentryMiddleware;
