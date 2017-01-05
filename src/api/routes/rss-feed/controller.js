import omit from 'lodash/omit';
import { schedule } from 'worker/jobs/rss-feed-import-posts';
import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

export const index = indexBlueprint('RSSFeed');
export const show = showBlueprint('RSSFeed');

export async function create(req) {
  const feed = req.app.models.RSSFeed.build(omit(req.body, ['created', 'updated']));
  feed.setUser(req.user);
  await schedule(feed.id, true);
  return await feed.save();
}

export const update = updateBlueprint('RSSFeed');
export const remove = removeBlueprint('RSSFeed');
