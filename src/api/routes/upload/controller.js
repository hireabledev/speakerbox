import omit from 'lodash/omit';

export async function index(req, res, next) {
  const { limit, skip, where, attributes } = res.locals;

  const Upload = req.app.models.Upload;
  const uploads = await Upload
    .scopeForUser(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: Upload.getValidAttributes(attributes),
    });

  return {
    data: uploads.slice(0, limit),
    more: uploads.length > limit,
  };
}

export async function show(req) {
  return await req.app.models.Upload
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
}

export async function create(req) {
  const upload = req.app.models.Upload.build(omit(req.body, ['created', 'updated']));
  const file = req.files[0];
  upload.title = req.body.title || file.originalname;
  upload.url = file.location;
  upload.setUser(req.user);
  return await upload.save();
}

export async function update(req) {
  const upload = await req.app.models.Upload
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  const body = omit(req.body, ['id', 'created', 'updated', 'url']);
  const file = req.files[0];
  if (file) {
    body.url = file.location;
  }
  return upload.update(body);
}

export async function remove(req) {
  const upload = await req.app.models.Upload
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  return await upload.destroy();
}
