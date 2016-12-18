import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('LinkedinPost');
export const show = showBlueprint('LinkedinPost');
export const update = updateBlueprint('LinkedinPost');
export const remove = removeBlueprint('LinkedinPost');
