import { config as dotenv } from 'dotenv';
import env, { transforms } from 'lib/env';

dotenv();

export const ENV = process.env.NODE_ENV || 'development';
export const IS_PROD = (ENV === 'production');
export const IS_TEST = (ENV === 'test');
export const IS_DEV = (ENV === 'development');

export const PORT = env({
  name: 'PORT',
  defaultValue: 3000,
  transform: transforms.integer,
});

export const HOST = env({
  name: 'HOST',
  defaultValue: `http://localhost:${PORT}`,
});

export const SECRET = env({
  name: 'SECRET',
  defaultValue: 'speaker boxy box',
  required: IS_PROD,
});

export const STATIC_URL = env({
  name: 'STATIC_URL',
  defaultValue: '/assets',
});

export const FORCE_STATIC_ASSETS = env({
  name: 'FORCE_STATIC_ASSETS',
  defaultValue: false,
  transform: transforms.boolean,
});

export const REDIS_URL = env({
  name: 'REDIS_URL',
  required: IS_PROD,
});

// Sentry
export const SENTRY_DSN = env({
  name: 'SENTRY_DSN',
  defaultValue: null,
  required: IS_PROD,
});

export const SENTRY_DSN_PUBLIC = env({
  name: 'SENTRY_DSN_PUBLIC',
  defaultValue: null,
  required: IS_PROD,
});

// Analytics
export const GA_ID = env({
  name: 'GA_ID',
});

export const MIXPANEL_ID = env({
  name: 'MIXPANEL_ID',
});

export const ADSENSE_ID = env({
  name: 'ADSENSE_ID',
});

export const PROPELLER_ID = env({
  name: 'PROPELLER_ID',
});

// AWS
export const AWS_ACCESS_KEY_ID = env({
  name: 'AWS_ACCESS_KEY_ID',
  required: IS_PROD,
});

export const AWS_SECRET_ACCESS_KEY = env({
  name: 'AWS_SECRET_ACCESS_KEY',
  required: IS_PROD,
});

export const AWS_S3_BUCKET = env({
  name: 'AWS_S3_BUCKET',
  defaultValue: 'speakerbox',
});

export const AWS_REGION = env({
  name: 'AWS_REGION',
  defaultValue: 'us-west-1',
});

// Let's Encrypt
export const LETS_ENCRYPT_URL = env({
  name: 'LETS_ENCRYPT_URL',
});

export const LETS_ENCRYPT_KEY = env({
  name: 'LETS_ENCRYPT_KEY',
});

// Kue
export const KUE_CLEANUP_BATCH_SIZE = env({
  name: 'KUE_CLEANUP_BATCH_SIZE',
  defaultValue: 1000,
  transform: transforms.integer,
});

// Email
export const SEND_EMAIL = env({
  name: 'SEND_EMAIL',
  defaultValue: IS_PROD,
});

export const SENDGRID_API_KEY = env({
  name: 'SENDGRID_API_KEY',
});

export const CONTACT_EMAIL = env({
  name: 'CONTACT_EMAIL',
  defaultValue: 'Speaker Box <no-reply@speakerbox.io>',
});

export const LEGAL_EMAIL = env({
  name: 'LEGAL_EMAIL',
  defaultValue: 'hi@dasylabs.com',
});

export const DEFAULT_EMAIL_TEMPLATE = env({
  name: 'DEFAULT_EMAIL_TEMPLATE',
});

// Social Networks + RSS
export const FB_KEY = env({
  name: 'FB_KEY',
  required: true,
});

export const FB_SECRET = env({
  name: 'FB_SECRET',
  required: true,
});

export const FB_CB_URL = env({
  name: 'FB_CB_URL',
  defaultValue: `${HOST}/sso/auth/facebook/callback`,
});

export const FB_API_URL = env({
  name: 'FB_API_URL',
  defaultValue: 'https://graph.facebook.com/v2.2',
});

export const TWITTER_KEY = env({
  name: 'TWITTER_KEY',
  required: true,
});

export const TWITTER_SECRET = env({
  name: 'TWITTER_SECRET',
  required: true,
});

export const TWITTER_CB_URL = env({
  name: 'TWITTER_CB_URL',
  defaultValue: `${HOST}/sso/auth/twitter/callback`,
});

export const LINKEDIN_KEY = env({
  name: 'LINKEDIN_KEY',
  required: true,
});

export const LINKEDIN_SECRET = env({
  name: 'LINKEDIN_SECRET',
  required: true,
});

export const LINKEDIN_CB_URL = env({
  name: 'LINKEDIN_CB_URL',
  defaultValue: `${HOST}/sso/auth/linkedin/callback`,
});

export const LINKEDIN_API_URL = env({
  name: 'LINKEDIN_API_URL',
  defaultValue: 'https://api.linkedin.com/v1',
});

export const ACCOUNT_FETCH_DELAY = env({
  name: 'ACCOUNT_FETCH_DELAY',
  defaultValue: 1000 * 60 * 15,
  transform: transforms.integer,
});

export const RSS_FETCH_DELAY = env({
  name: 'RSS_FETCH_DELAY',
  defaultValue: 1000 * 60 * 15,
  transform: transforms.integer,
});

export const VERSION = env({
  name: 'HEROKU_SLUG_COMMIT',
  defaultValue: `${ENV}-${new Date().getTime()}`,
  required: IS_PROD,
});

export const FORCE_HTTPS = env({
  name: 'FORCE_HTTPS',
  defaultValue: IS_PROD,
  required: true,
  transform: transforms.boolean,
});
