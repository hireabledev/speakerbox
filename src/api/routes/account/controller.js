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
  const where = { id: req.params.id };
  if (req.query.type) {
    where.type = req.query.type;
  }
  return await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findOneOr404({ where });
}

export async function update(req) {
  const where = { id: req.params.id };
  if (req.query.type) {
    where.type = req.query.type;
  }
  const instance = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findOneOr404({ where });
  return instance.update(req.body);
}

export async function remove(req) {
  const where = { id: req.params.id };
  if (req.query.type) {
    where.type = req.query.type;
  }
  const instance = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findOneOr404({ where });
  return await instance.destroy();
}
