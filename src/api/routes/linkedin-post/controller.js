import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('LinkedInPost');
export const show = showBlueprint('LinkedInPost');
export const update = updateBlueprint('LinkedInPost');
export const remove = removeBlueprint('LinkedInPost');
