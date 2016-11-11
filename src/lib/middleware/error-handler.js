import PrettyError from 'pretty-error';
import { wrap as wrapError } from 'boom';
import { server as debug } from '../debug';

const pe = new PrettyError();
pe.skipNodeFiles();

export default function errorHandlerMiddleware(err, req, res, next) {
  debug.error(pe.render(err));

  const error = wrapError(err);

  const payload = error.output.payload;
  const message = `${error.name}: ${error.message}`;
  const status = payload.statusCode || 500;

  // if (req.xhr || req.is('json')) {
    return res.status(status).json({
      ...payload,
      message,
    });
  // }

  // return res.status(status).render('error-page.njk', {
  //   title: `${payload.error} Error`,
  //   error: payload,
  // });
}
