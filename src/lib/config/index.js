import { config as debug } from '../debug';

export const ENV = process.env.NODE_ENV || 'development';
export const IS_PROD = (ENV === 'production');
export const IS_TEST = (ENV === 'test');
export const IS_DEV = (ENV === 'development');

function env(str, defaultValue, required) {
  const result = process.env[str] || defaultValue;
  if (IS_PROD && required === 'required' && !result) {
    throw new Error(`${str} env variable is required.`);
  }
  if (result === undefined) {
    debug.warn(`Optional env variable ${str} is undefined.`);
  } else if (result === null) {
    debug.warn(`Optional env variable ${str} is null.`);
  }
  return result;
}

export const PORT = env('PORT', 3000);
export const HOST = env('HOST', `http://localhost:${PORT}`);
export const SECRET = env('SECRET', 'speaker boxy box');
export const STATIC_URL = env('STATIC_URL', '/assets');

export const SENTRY_DSN = env('SENTRY_DSN', null);
export const SENTRY_DSN_PUBLIC = env('SENTRY_DSN_PUBLIC', null);
export const GA_ID = env('GA_ID');
export const MIXPANEL_ID = env('MIXPANEL_ID', null);

export const AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID', null, 'required');
export const AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY', null, 'required');
export const AWS_S3_BUCKET = env('AWS_S3_BUCKET', 'speaker-box');
export const AWS_REGION = env('AWS_REGION', 'us-west-1');

export const LETS_ENCRYPT_URL = env('LETS_ENCRYPT_URL');
export const LETS_ENCRYPT_KEY = env('LETS_ENCRYPT_KEY');

export const REDIS_URL = env('REDIS_URL');

export const KUE_USER = env('KUE_USER', 'kue');
export const KUE_PWD = env('KUE_PWD', null, 'required');

export const SEND_EMAIL = env('SEND_EMAIL', IS_PROD);
export const SENDGRID_API_KEY = env('SENDGRID_API_KEY', null);
export const CONTACT_EMAIL = env('CONTACT_EMAIL', 'Speaker Box <no-reply@speakerbox.io>');

export const FB_KEY = env('FB_KEY', null, 'required');
export const FB_SECRET = env('FB_SECRET', null, 'required');
export const FB_CB_URL = env('FB_CB_URL', `${HOST}/sso/auth/facebook/callback`);

export const FB_API_URL = env('FB_API_URL', 'https://graph.facebook.com/v2.2');
export const FB_FETCH_DELAY = env('FB_FETCH_DELAY', 899995);

export const TWITTER_KEY = env('TWITTER_KEY', null, 'required');
export const TWITTER_SECRET = env('TWITTER_SECRET', null, 'required');
export const TWITTER_CB_URL = env('TWITTER_CB_URL', `${HOST}/sso/auth/twitter/callback`);

export const TWITTER_FETCH_DELAY = env('TWITTER_FETCH_DELAY', 899995);

export const LINKEDIN_KEY = env('LINKEDIN_KEY', null, 'required');
export const LINKEDIN_SECRET = env('LINKEDIN_SECRET', null, 'required');
export const LINKEDIN_CB_URL = env('LINKEDIN_CB_URL', `${HOST}/sso/auth/linkedin/callback`);

export const LINKEDIN_FETCH_DELAY = env('LINKEDIN_FETCH_DELAY', 899995);

export const LINKEDIN_API_URL = env('LINKEDIN_API_URL', 'https://api.linkedin.com/v1');

export const ADSENSE_ID = env('ADSENSE_ID');
export const VERSION = env('HEROKU_SLUG_COMMIT', `dev-${new Date().getTime()}`);

const forceHttps = env('FORCE_HTTPS', IS_PROD);
export const FORCE_HTTPS = typeof forceHttps === 'string' ? JSON.parse(forceHttps) : forceHttps;

// Email Templates
export const DEFAULT_EMAIL_TEMPLATE = env('DEFAULT_EMAIL_TEMPLATE', null);
