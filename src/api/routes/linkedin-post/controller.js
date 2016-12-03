import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
  shareBlueprint,
  cancelShareBlueprint,
} from '../../blueprints/post';

export const index = indexBlueprint('LinkedInPost');
export const show = showBlueprint('LinkedInPost');
export const update = updateBlueprint('LinkedInPost');
export const remove = removeBlueprint('LinkedInPost');

export const share = shareBlueprint('LinkedInPost', 'LINKEDIN_SHARE', post => `Share ${post.id}`);
export const removeShare = cancelShareBlueprint('LinkedInPost', 'LINKEDIN_SHARE', post => `Share ${post.id}`);
