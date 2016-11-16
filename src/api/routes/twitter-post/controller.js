import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('TwitterPost');
export const show = showBlueprint('TwitterPost');
export const update = updateBlueprint('TwitterPost');
export const remove = removeBlueprint('TwitterPost');
