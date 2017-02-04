import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

const MODEL_NAME = 'Account';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);
export const update = updateBlueprint(MODEL_NAME);
export const remove = removeBlueprint(MODEL_NAME);
