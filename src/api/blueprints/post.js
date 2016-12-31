import startCase from 'lodash/startCase';
import omit from 'lodash/omit';

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
        order: [['date', 'DESC']],
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
    return instance.update(omit(req.body, ['id', 'created', 'updated']));
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

export function createScheduledBlueprint(modelName, jobType) {
  return async function createScheduled(req) {
    const Model = req.app.models[modelName];
    const account = await req.app.models.Account
      .scopeForUser(req.user, req.query.user)
      .findByIdOr404(req.body.accountId);
    const body = {
      ...omit(req.body, ['id', 'created', 'updated']),
      date: req.body.date || new Date(),
    };
    const instance = Model.build(body);
    const job = await req.app.addJob({
      type: jobType,
      title: `${startCase(jobType)} ${instance.id}`,
      delay: body.date,
      data: {
        ...body,
        accountId: account.id,
      },
    });
    instance.jobId = job.id;
    instance.setAccount(account);
    try {
      return await instance.save();
    } catch (err) {
      await req.app.removeJob(job.id);
      throw err;
    }
  };
}

export function updateScheduledBlueprint(modelName, jobType) {
  return async function update(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    const body = {
      ...omit(req.body, ['id', 'created', 'updated']),
      date: req.body.date || instance.date,
    };
    const oldJob = await req.app.removeJob(instance.jobId);
    const job = await req.app.addJob({
      type: jobType,
      title: `${startCase(jobType)} ${instance.id}`,
      delay: body.date,
      data: {
        ...oldJob.data.data,
        ...body,
        accountId: oldJob.data.data.accountId,
      },
    });
    try {
      return await instance.update({ ...body, date: body.date, jobId: job.id });
    } catch (err) {
      await req.app.removeJob(job.id);
      throw err;
    }
  };
}

export function removeScheduledBlueprint(modelName) {
  return async function remove(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUserAccounts(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    await req.app.removeJob(instance.jobId);
    return await instance.destroy();
  };
}
