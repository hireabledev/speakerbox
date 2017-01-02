import { Router } from 'express';
import {
  authenticated as authenticatedMiddleware,
  adminOnly as adminOnlyMiddleware,
} from '../lib/middleware/access-control';

export function patchController(controller) {
  return function patchedController(req, res, next) {
    const result = controller.call(this, req, res, next);
    if (result && result.then) {
      return result
        .then(data => res.status(res.locals.status || (data ? 200 : 204)).json(data))
        .catch(next);
    } else if (result) {
      return res.status(res.locals.status || 200).json(result);
    } else if (!res.headersSent) {
      return next();
    }
    return null;
  };
}

export default function configureRouter({
  authenticated = true,
  adminOnly = false,
  routerOptions = {},
} = {}) {
  const router = new Router({
    mergeParams: true,
    ...routerOptions,
  });

  if (authenticated) { router.use(authenticatedMiddleware); }
  if (adminOnly) { router.use(adminOnlyMiddleware); }

  const patchedMethods = [
    'head',
    'options',
    'get',
    'post',
    'put',
    'patch',
    'delete',
  ];

  patchedMethods.forEach(method => {
    const originalMethod = `_${method}`;
    router[originalMethod] = router[method];
    router[method] = function patchedMethod(path, ...callbacks) {
      const middleware = callbacks.slice(0, -1);
      const controller = patchController(callbacks.slice(-1)[0]);
      return router[originalMethod](path, ...middleware, controller);
    };
  });

  return router;
}
