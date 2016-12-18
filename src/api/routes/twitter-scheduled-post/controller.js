import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'twitter-scheduled-post';

export const index = indexBlueprint('TwitterScheduledPost');
export const show = showBlueprint('TwitterScheduledPost');
export const create = createScheduledBlueprint('TwitterScheduledPost', JOB_TYPE);
export const update = updateScheduledBlueprint('TwitterScheduledPost', JOB_TYPE);
export const remove = removeScheduledBlueprint('TwitterScheduledPost');
