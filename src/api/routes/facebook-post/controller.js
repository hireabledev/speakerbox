import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('FacebookPost');
export const show = showBlueprint('FacebookPost');
export const update = updateBlueprint('FacebookPost');
export const remove = removeBlueprint('FacebookPost');
