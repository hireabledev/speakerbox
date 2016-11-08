import { forbidden, unauthorized } from 'boom';

export function applyMiddleware(...middlewares) {
  return function middlewareResolver(...args) {
    let result = args[0];
    middlewares.forEach(middleware => {
      result = middleware.call(this, result, ...args.slice(1)) || result;
    });
    return result;
  };
}

export function authenticated(options, args, req) {
  if (!req.user) {
    throw unauthorized();
  }
}

export function admin(options, args, req) {
  if (!req.user.isAdmin) {
    throw forbidden();
  }
}

export function scopeToUser(options, args, req) {
  const result = {
    ...options,
  };
  if (!req.user.isAdmin) {
    result.where = {
      ...result.where,
      userId: req.user.id,
    };
  }
  return result;
}
