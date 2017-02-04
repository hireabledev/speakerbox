export function indexBlueprint(modelName) {
  return async function index(req, res, next) {
    const Model = req.app.models[modelName];
    const { limit, skip, where, attributes, sort } = res.locals;

    const instances = await Model
      .scopeForUser(req.user, req.query.user)
      .findAll({
        limit: limit + 1,
        offset: skip,
        where,
        attributes: Model.getValidAttributes(attributes),
        order: sort,
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
      .scopeForUser(req.user, req.query.user)
      .findByIdOr404(req.params.id);
  };
}

export function createBlueprint(modelName) {
  return async function create(req) {
    const Model = req.app.models[modelName];
    const instance = Model.build(req.body);
    instance.setUser(req.user);
    return await instance.save();
  };
}

export function updateBlueprint(modelName) {
  return async function update(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUser(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    return instance.update(req.body);
  };
}

export function removeBlueprint(modelName) {
  return async function remove(req) {
    const Model = req.app.models[modelName];
    const instance = await Model
      .scopeForUser(req.user, req.query.user)
      .findByIdOr404(req.params.id);
    if (instance.jobId) {
      await req.app.removeJob(instance.jobId);
    }
    await instance.destroy();
    return instance;
  };
}
