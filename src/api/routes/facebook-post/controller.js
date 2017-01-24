import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

const MODEL_NAME = 'FacebookPost';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);
export const update = updateBlueprint(MODEL_NAME);
export const remove = removeBlueprint(MODEL_NAME);
