import { FORCE_HTTPS, LETS_ENCRYPT_URL } from 'lib/config';

export default function httpsMiddleware(req, res, next) {
  const NOT_HTTPS = req.headers['x-forwarded-proto'] !== 'https';
  const NOT_LETS_ENCRYPT = req.path !== `/${LETS_ENCRYPT_URL}`;
  if (FORCE_HTTPS && NOT_HTTPS && NOT_LETS_ENCRYPT) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}
