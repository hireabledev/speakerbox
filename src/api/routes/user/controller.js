export async function index(req, res, next) {
  const User = req.app.models.User;
  const { limit, skip, where, attributes } = res.locals;

  const users = await User.findAll({
    limit: limit + 1,
    offset: skip,
    where,
    attributes: User.getValidAttributes(attributes),
  });

  return {
    data: users.slice(0, limit),
    more: users.length > limit,
  };
}

export async function show(req) {
  return await req.app.models.User.findByIdOr404(req.params.id);
}

export async function create(req) {
  return await req.app.models.User.create(req.body);
}

export async function update(req) {
  const user = await req.app.models.User.findByIdOr404(req.params.id);
  return user.update(req.body);
}

export async function remove(req) {
  const user = await req.app.models.User.findByIdOr404(req.params.id);
  return await user.destroy();
}
