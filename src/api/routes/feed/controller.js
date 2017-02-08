import { schedule } from 'worker/jobs/feed-import-posts';
import {
  indexBlueprint,
  showBlueprint,
  updateBlueprint,
  removeBlueprint,
} from '../../blueprints';

const MODEL_NAME = 'Feed';

export const index = indexBlueprint(MODEL_NAME);
export const show = showBlueprint(MODEL_NAME);

export async function create(req) {
  const feed = req.app.models.Feed.build(req.body);
  feed.setUser(req.user);
  await feed.save();
  await schedule(feed, true);
  return await feed.save();
}

export const update = updateBlueprint(MODEL_NAME);
export const remove = removeBlueprint(MODEL_NAME);
