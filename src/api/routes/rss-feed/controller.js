import omit from 'lodash/omit';
import { schedule } from 'worker/jobs/rss-feed-import-posts';
import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

const MODEL_NAME = 'RSSFeed';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);

export async function create(req) {
  const feed = req.app.models.RSSFeed.build(omit(req.body, ['created', 'updated']));
  feed.setUser(req.user);
  await schedule(feed.id, true);
  return await feed.save();
}

export const update = updateBlueprint(MODEL_NAME);
export const remove = removeBlueprint(MODEL_NAME);
