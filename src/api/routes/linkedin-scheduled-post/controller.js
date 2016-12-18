import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'linkedin-scheduled-post';

export const index = indexBlueprint('LinkedinScheduledPost');
export const show = showBlueprint('LinkedinScheduledPost');
export const create = createScheduledBlueprint('LinkedinScheduledPost', JOB_TYPE);
export const update = updateScheduledBlueprint('LinkedinScheduledPost', JOB_TYPE);
export const remove = removeScheduledBlueprint('LinkedinScheduledPost');
