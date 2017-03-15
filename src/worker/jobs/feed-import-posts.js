import uuid from 'uuid';
import sanitizeHtml from 'sanitize-html';
import sentry from 'lib/sentry';
import { RSS_FETCH_DELAY } from 'lib/config';
import { addJob, removeJob } from 'lib/queue';
import { kue as debug } from 'lib/debug';
import { Feed, Post } from 'lib/models';
import fetchFeed from 'lib/rss';
import { syncedRecently } from '../utils';

export async function schedule(feed, immediate) {
  const job = await addJob({
    type: 'feed-import-posts',
    title: `Import Posts for Feed ${feed.id}`,
    delay: immediate ? 0 : RSS_FETCH_DELAY,
    priority: 'low',
    data: { feedId: feed.id },
  });
  if (feed.isNewRecord === false) {
    if (feed.jobId) {
      await removeJob(feed.jobId);
    }
    await feed.update({ jobId: job.id });
  }
  return job;
}

export default async function feedImportPostsProcessor(job, done) {
  const { feedId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  // get feed
  const feed = await Feed.findById(feedId);
  if (!feed) {
    job.log('Feed no longer exists.');
    return done();
  }
  job.progress(1, PROGRESS_TOTAL, 'Fetched feed');

  try {
    // check if synced recently
    if (syncedRecently(feed)) {
      job.log('Feed synced recently. Re-scheduling.');
      await schedule(feed);
      return done();
    }

    // fetch posts
    const { items } = await fetchFeed(feed.url);
    job.progress(2, PROGRESS_TOTAL, 'Fetched rss posts');

    // save to database
    // TODO: move mapping to lib
    const posts = await Promise.all(
      items
        .filter(item => item.description != null)
        .map(item => {
          const id = uuid.v4();
          return Post.create({
            id,
            nativeId: item.id || id,
            type: 'rss',
            date: new Date(item.date),
            message: sanitizeHtml(item.description),
            authorName: item.author,
            url: item.link,
            feedId,
          });
        }),
    );
    job.progress(3, PROGRESS_TOTAL, `Created ${posts.length} posts`);

    // schedule next job and remove old one
    await schedule(feed);

    // update feed
    await feed.update({ synced: new Date() });
    job.progress(4, PROGRESS_TOTAL, 'Updated feed.');

    return done();
  } catch (err) {
    if (err.name !== 'SequelizeUniqueConstraintError') {
      debug.error(err);
      sentry.captureException(err);
    } else {
      debug.warn(err);
    }
    await schedule(feed);
    return done(err);
  }
}
