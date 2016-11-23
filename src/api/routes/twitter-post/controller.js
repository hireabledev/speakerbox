import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
  shareBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('TwitterPost');
export const show = showBlueprint('TwitterPost');
export const update = updateBlueprint('TwitterPost');
export const remove = removeBlueprint('TwitterPost');
export const retweet = shareBlueprint('TwitterPost', 'TWITTER_RETWEET', post => `Retweet ${post.id}`);
