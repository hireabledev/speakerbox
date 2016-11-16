export async function index(req, res, next) {
  const Account = req.app.models.Account;
  const { limit, skip, where, attributes } = res.locals;

  const instances = await Account
    .scopeForUser(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: Account.getValidAttributes(attributes),
    });

  return {
    data: instances.slice(0, limit),
    more: instances.length > limit,
  };
}

export async function show(req) {
  const Account = req.app.models.Account;
  return await Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function create(req) {
  const Account = req.app.models.Account;
  const instance = Account.build(req.body);
  instance.setUser(req.user);
  return await instance.save();
}

export async function update(req) {
  const Account = req.app.models.Account;
  const instance = await Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return instance.update(req.body);
}

export async function remove(req) {
  const Account = req.app.models.Account;
  const instance = await Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return await instance.destroy();
}
