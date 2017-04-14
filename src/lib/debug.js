import debug from 'debug';

const boundConsoleInfo = console.info.bind(console);
const boundConsoleWarn = console.warn.bind(console);
const boundConsoleError = console.error.bind(console);

function init(name) {
  const info = debug(`speakerbox:${name}:info`);
  info.log = boundConsoleInfo;

  const warn = debug(`speakerbox:${name}:warn`);
  warn.log = boundConsoleWarn;

  const error = debug(`speakerbox:${name}:error`);
  error.log = boundConsoleError;

  return { info, warn, error };
}

export const server = init('server');
export const worker = init('worker');
export const kue = init('kue');
export const email = init('email');
export const db = init('db');
export const sentry = init('sentry');
export const mixpanel = init('mixpanel');
export const analytics = init('analytics');
export const config = init('config');
