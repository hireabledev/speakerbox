import { forbidden } from 'boom';

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
  const id = req.params.id === 'me' ? req.user.id : req.params.id;
  return req.app.models.User.findByIdOr404(id);
}

export async function create(req) {
  return req.app.models.User.create(req.body);
}

export async function update(req) {
  if (req.user.isAdmin === false && req.user.id !== req.params.id) {
    throw forbidden('Only admins are allowed to do that');
  }
  const user = await req.app.models.User.findByIdOr404(req.params.id);
  return user.update(req.body);
}

export async function remove(req) {
  if (req.user.isAdmin === false && req.user.id !== req.params.id) {
    throw forbidden('Only admins are allowed to do that');
  }
  const user = await req.app.models.User.findByIdOr404(req.params.id);
  await user.destroy();
  return user;
}
