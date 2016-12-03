import kue from 'kue';
import { enqueue } from '../../lib/queue';

export function indexBlueprint(modelName) {
  return async function index(req, res, next) {
    const Model = req.app.models[modelName];
    const { limit, skip, where, attributes } = res.locals;

    const instances = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findAll({
        limit: limit + 1,
        offset: skip,
        where,
        attributes: Model.getValidAttributes(attributes),
      });

    return {
      data: instances.slice(0, limit),
      more: instances.length > limit,
    };
  };
}

export function showBlueprint(modelName) {
  return async function show(req) {
    const Model = req.app.models[modelName];
    return await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id);
  };
}

export function updateBlueprint(modelName) {
  return async function update(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    return instance.update(req.body);
  };
}

export function removeBlueprint(modelName) {
  return async function remove(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    return await instance.destroy();
  };
}

export function shareBlueprint(modelName, type, getTitle) {
  return async function share(req) {
    const Model = req.app.models[modelName];
    const post = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id, {
        include: [req.app.models.Account],
      });

    if (post.shareJobId) {
      await new Promise((resolve, reject) => {
        kue.Job.get(post.shareJobId, (err, job) => {
          if (err) { return reject(err); }
          return job.remove(err => {
            /* eslint "no-shadow": 0 */
            if (err) { return reject(err); }
            return resolve(job);
          });
        });
      });
    }

    const data = {
      id: post.id,
      accountId: post.accountId,
    };

    const job = await enqueue({
      type,
      title: getTitle(post),
      delay: req.body.date || 0,
      data,
    });

    return await post.update({ shareJobId: job.id });
  };
}

export function cancelShareBlueprint(modelName) {
  return async function share(req) {
    const Model = req.app.models[modelName];
    const post = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id, {
        include: [req.app.models.Account],
      });

    await new Promise((resolve, reject) => {
      kue.Job.get(post.shareJobId, (err, job) => {
        if (err) { return reject(err); }
        return job.remove(err => {
          /* eslint "no-shadow": 0 */
          if (err) { return reject(err); }
          return resolve(job);
        });
      });
    });

    return await post.update({ shareJobId: null });
  };
}
