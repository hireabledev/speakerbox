import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const MODEL_NAME = 'LinkedinScheduledPost';
const JOB_TYPE = 'linkedin-scheduled-post';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);
export const create = createScheduledBlueprint(MODEL_NAME, JOB_TYPE);
export const update = updateScheduledBlueprint(MODEL_NAME, JOB_TYPE);
export const remove = removeScheduledBlueprint(MODEL_NAME);
