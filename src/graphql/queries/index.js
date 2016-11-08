export function scopeToUser(options, args, req) {
  const result = {
    ...options,
  };
  if (!req.user.isAdmin) {
    result.where = { userId: req.user.id };
  }
  return result;
}
