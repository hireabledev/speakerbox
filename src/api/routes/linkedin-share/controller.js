import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('LinkedInShare');
export const show = showBlueprint('LinkedInShare');

export async function create(req) {
  const instance = req.app.models.LinkedInShare.build(req.body);
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.query.accountId);
  instance.setAccount(account);
  return await instance.save();
}

export const update = updateBlueprint('LinkedInShare');
export const remove = removeBlueprint('LinkedInShare');
