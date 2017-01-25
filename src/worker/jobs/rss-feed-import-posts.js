import sanitizeHtml from 'sanitize-html';
import { FB_FETCH_DELAY } from 'lib/config';
import { addJob } from 'lib/queue';
import { kue as debug } from 'lib/debug';
import { RSSFeed, RSSPost } from 'lib/models';
import fetchFeed from 'lib/rss';
import { syncedRecently } from '../utils';

export function schedule(rssFeedId, immediate) {
  return addJob({
    type: 'rss-feed-import-posts',
    title: `RSS Feed Import Posts for ${rssFeedId}`,
    delay: immediate ? 0 : FB_FETCH_DELAY,
    priority: 'low',
    data: { rssFeedId },
  });
}

export default async function rssFeedImportPostsProcessor(job, done) {
  const { rssFeedId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  try {
    // get account
    const feed = await RSSFeed.findById(rssFeedId);
    if (!feed) {
      job.log('RSSFeed no longer exists.');
      return done();
    }
    job.progress(1, PROGRESS_TOTAL, 'Fetched feed');

    // check if synced recently
    if (syncedRecently(feed)) {
      job.log('RSSFeed synced recently. Re-scheduling.');
      await schedule(rssFeedId);
      return done();
    }

    // fetch posts
    const { items } = await fetchFeed(feed.url);
    job.progress(2, PROGRESS_TOTAL, 'Fetched rss posts');

    // save to database
    const posts = await RSSPost.bulkCreate(items.map(post => ({
      ...post,
      date: new Date(post.date),
      message: sanitizeHtml(post.description),
      url: post.link,
      rssFeedId,
    })));
    job.progress(3, PROGRESS_TOTAL, `Created ${posts.length} posts`);

    // update feed
    await feed.update({ synced: new Date() });
    job.progress(4, PROGRESS_TOTAL, 'Updated feed.');

    await schedule(rssFeedId);
    return done();
  } catch (err) {
    debug.error(err);
    await schedule(rssFeedId);
    return done(err);
  }
}
