export async function index(req, res, next) {
  const Post = req.app.models.Post;
  const { limit, skip, where, attributes } = res.locals;

  const posts = await Post.scopeForUser(req.user, req.query.user).findAll({
    limit: limit + 1,
    offset: skip,
    where,
    attributes: Post.getValidAttributes(attributes),
  });

  return {
    data: posts.slice(0, limit),
    more: posts.length > limit,
  };
}

export async function show(req) {
  return await req.app.models.Post
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function create(req) {
  const post = req.app.models.Post.build(req.body);
  post.setUser(req.user);
  return await post.save();
}

export async function update(req) {
  const post = await req.app.models.Post
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return post.update(req.body);
}

export async function remove(req) {
  const post = await req.app.models.Post
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return await post.destroy();
}
