import {
  indexBlueprint,
  showBlueprint,
  createBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

export const index = indexBlueprint('RSSFeed');
export const show = showBlueprint('RSSFeed');
export const create = createBlueprint('RSSFeed');
export const update = updateBlueprint('RSSFeed');
export const remove = removeBlueprint('RSSFeed');
