import PrettyError from 'pretty-error';
import { wrap as wrapError } from 'boom';
import { server as debug } from '../debug';

const pe = new PrettyError();
pe.skipNodeFiles();

export default function errorHandlerMiddleware(err, req, res, next) {
  debug.error(pe.render(err));

  const error = err.isBoom ? err : wrapError(err);

  const status = error.output.payload.statusCode || 500;
  const payload = error.output.payload;

  if (req.xhr || req.is('json')) {
    return res.status(status).json(payload);
  }

  return res.status(status).render('error-page.njk', {
    title: `${payload.error} Error`,
    error: payload,
  });
}
