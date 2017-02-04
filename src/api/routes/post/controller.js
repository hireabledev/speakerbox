export async function index(req, res, next) {
  const Post = req.app.models.Post;
  const { limit, skip, where, attributes, sort } = res.locals;

  const attrs = attributes
    ? Post.getValidAttributes(attributes)
    : { exclude: ['data'] };

  const posts = await Post
    .scopeForUserAccountsOrFeeds(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: attrs,
      order: sort,
    });

  return {
    data: posts.slice(0, limit),
    more: posts.length > limit,
  };
}

export async function show(req) {
  return await req.app.models.Post
    .scopeForUserAccountsOrFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function update(req) {
  const post = await req.app.models.Post
    .scopeForUserAccountsOrFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return post.update(req.body);
}

export async function remove(req) {
  const post = await req.app.models.Post
    .scopeForUserAccountsOrFeeds(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  await post.destroy();
  return post;
}
