function env(str, defaultValue, required) {
  if (required === 'required' && !str) {
    throw new Error(`${str} env variable is required.`);
  }
  return process.env[str] || defaultValue;
}

export const ENV = env('NODE_ENV', 'development');
export const IS_PROD = (ENV === 'production');
export const IS_TEST = (ENV === 'test');
export const IS_DEV = (ENV === 'development');

export const PORT = env('PORT', 3000);
export const HOST = env('HOST', `http://localhost:${PORT}`);
export const SECRET = env('SECRET', 'speaker boxy box');
export const STATIC_URL = env('STATIC_URL', '/assets');

export const SENTRY_DSN = env('SENTRY_DSN', null);
export const SENTRY_DSN_PUBLIC = env('SENTRY_DSN_PUBLIC', null);
export const GA_ID = env('GA_ID');
export const MIXPANEL_ID = env('MIXPANEL_ID', null);

export const LETS_ENCRYPT_URL = env('LETS_ENCRYPT_URL');
export const LETS_ENCRYPT_KEY = env('LETS_ENCRYPT_KEY');

export const REDIS_URL = env('REDIS_URL');

export const KUE_USER = env('KUE_USER', 'kue');
export const KUE_PWD = env('KUE_PWD', null, 'required');

export const SEND_EMAIL = env('SEND_EMAIL', IS_PROD);
export const SENDGRID_API_KEY = env('SENDGRID_API_KEY', null, 'required');
export const CONTACT_EMAIL = env('CONTACT_EMAIL', 'Speaker Box <no-reply@speakerbox.io>');

// Email Templates
export const DEFAULT_EMAIL_TEMPLATE = env('DEFAULT_EMAIL_TEMPLATE', null, 'required');
