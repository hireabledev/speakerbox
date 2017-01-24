import {
  indexBlueprint,
  showBlueprint,
  createScheduledBlueprint,
  updateScheduledBlueprint,
  removeScheduledBlueprint,
} from '../../blueprints/post';

const MODEL_NAME = 'TwitterScheduledRetweet';
const JOB_TYPE = 'twitter-scheduled-retweet';

export const index = indexBlueprint(MODEL_NAME, {
  mapQuery: (options, req) => ({
    ...options,
    include: [{
      model: req.app.models.TwitterPost,
    }],
  }),
});
export const show = showBlueprint(MODEL_NAME, {
  mapQuery: (options, req) => ({
    ...options,
    include: [{
      model: req.app.models.TwitterPost,
    }],
  }),
});
export const create = createScheduledBlueprint(MODEL_NAME, JOB_TYPE);
export const update = updateScheduledBlueprint(MODEL_NAME, JOB_TYPE);
export const remove = removeScheduledBlueprint(MODEL_NAME);
