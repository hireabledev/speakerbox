export async function index(req, res, next) {
  const Feed = req.app.models.RSSFeed;
  const { limit, skip, where, attributes } = res.locals;

  const instances = await Feed
    .scopeForUser(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: Feed.getValidAttributes(attributes),
    });

  return {
    data: instances.slice(0, limit),
    more: instances.length > limit,
  };
}

export async function show(req) {
  const Feed = req.app.models.RSSFeed;
  return await Feed
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function create(req) {
  const Feed = req.app.models.RSSFeed;
  const instance = Feed.build(req.body);
  instance.setUser(req.user);
  return await instance.save();
}

export async function update(req) {
  const Feed = req.app.models.RSSFeed;
  const instance = await Feed
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return instance.update(req.body);
}

export async function remove(req) {
  const Feed = req.app.models.RSSFeed;
  const instance = await Feed
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return await instance.destroy();
}
