import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'facebook-scheduled-post';

export const index = indexBlueprint('FacebookScheduledPost');
export const show = showBlueprint('FacebookScheduledPost');
export const create = createScheduledBlueprint('FacebookScheduledPost', JOB_TYPE);
export const update = updateScheduledBlueprint('FacebookScheduledPost', JOB_TYPE);
export const remove = removeScheduledBlueprint('FacebookScheduledPost');
