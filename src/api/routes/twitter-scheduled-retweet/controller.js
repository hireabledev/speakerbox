import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'twitter-scheduled-retweet';

export const index = indexBlueprint('TwitterScheduledRetweet');
export const show = showBlueprint('TwitterScheduledRetweet');
export const create = createScheduledBlueprint('TwitterScheduledRetweet', JOB_TYPE);
export const update = updateScheduledBlueprint('TwitterScheduledRetweet', JOB_TYPE);
export const remove = removeScheduledBlueprint('TwitterScheduledRetweet');
