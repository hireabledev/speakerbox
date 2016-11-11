import { forbidden, unauthorized } from 'boom';

export function authenticated(req, res, next) {
  if (!req.user) {
    throw unauthorized();
  }
  next();
}

export function adminOnly(req, res, next) {
  if (!req.user.isAdmin) {
    throw forbidden('Only admins are allowed to do that.');
  }
  next();
}
