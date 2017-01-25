import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

const MODEL_NAME = 'TwitterPost';

export const index = indexBlueprint(MODEL_NAME, {
  mapQuery: (options, req) => ({
    ...options,
    include: [{
      model: req.app.models.TwitterScheduledRetweet,
      as: 'scheduledRetweet',
    }],
  }),
});
export const show = showBlueprint(MODEL_NAME, {
  mapQuery: (options, req) => ({
    ...options,
    include: [{
      model: req.app.models.TwitterScheduledRetweet,
      as: 'scheduledRetweet',
    }],
  }),
});
export const update = updateBlueprint(MODEL_NAME);
export const remove = removeBlueprint(MODEL_NAME);
