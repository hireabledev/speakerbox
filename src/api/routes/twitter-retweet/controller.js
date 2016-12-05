import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('TwitterRetweet');
export const show = showBlueprint('TwitterRetweet');

export async function create(req) {
  const instance = req.app.models.TwitterRetweet.build(req.body);
  const post = await req.app.models.TwitterPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.query.postId);
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(post.accountId);
  instance.setTwitterPost(post);
  instance.setAccount(account);
  return await instance.save();
}

export const update = updateBlueprint('TwitterRetweet');
export const remove = removeBlueprint('TwitterRetweet');
