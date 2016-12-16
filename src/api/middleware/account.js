export function scopeToAccountType(type) {
  return function scopeToAccountTypeMiddleware(req, res, next) {
    req.query.type = type; // eslint-disable-line no-param-reassign
    next();
  };
}
