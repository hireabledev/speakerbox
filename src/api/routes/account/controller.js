import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

export const index = indexBlueprint('Account');
export const show = showBlueprint('Account');
export const update = updateBlueprint('Account');
export const remove = removeBlueprint('Account');
