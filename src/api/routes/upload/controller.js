import omit from 'lodash/omit';
import {
  indexBlueprint,
  showBlueprint,
  removeBlueprint,
} from '../../blueprints';

const MODEL_NAME = 'Upload';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);

export async function create(req) {
  const upload = req.app.models.Upload.build(omit(req.body, ['created', 'updated']));
  const file = req.files[0];
  upload.title = req.body.title || file.originalname;
  upload.url = file.location;
  upload.setUser(req.user);
  return upload.save();
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

export const remove = removeBlueprint(MODEL_NAME); // TODO: remove asset from S3
