export async function index(req, res, next) {
  const RSSPost = req.app.models.RSSPost;
  const { limit, skip, where, attributes } = res.locals;

  const instances = await RSSPost
    .scopeForUserFeeds(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: RSSPost.getValidAttributes(attributes),
    });

  return {
    data: instances.slice(0, limit),
    more: instances.length > limit,
  };
}

export async function show(req) {
  const RSSPost = req.app.models.RSSPost;
  return await RSSPost
    .scopeForUserFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function update(req) {
  const RSSPost = req.app.models.RSSPost;
  const instance = await RSSPost
    .scopeForUserFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return instance.update(req.body);
}

export async function remove(req) {
  const RSSPost = req.app.models.RSSPost;
  const instance = await RSSPost
    .scopeForUserFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return await instance.destroy();
}
