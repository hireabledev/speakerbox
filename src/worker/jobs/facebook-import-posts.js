import { FB_FETCH_DELAY } from 'lib/config';
import { addJob, removeJob } from 'lib/queue';
import { kue as debug } from 'lib/debug';
import { Account, FacebookPost } from 'lib/models';
import facebookClient from 'lib/facebook';
import { syncedRecently } from '../utils';

export function schedule(accountId, immediate) {
  return addJob({
    type: 'facebook-import-posts',
    title: `Facebook Import Posts for ${accountId}`,
    delay: immediate ? 0 : FB_FETCH_DELAY,
    priority: 'low',
    data: { accountId },
  });
}

export default async function facebookImportPostsProcessor(job, done) {
  const { accountId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  try {
    // get account
    const account = await Account.findById(accountId);
    if (!account) {
      job.log('Account no longer exists.');
      return done();
    }
    job.progress(1, PROGRESS_TOTAL, 'Fetched account');

    // check if synced recently
    if (syncedRecently(account)) {
      job.log('Account synced recently. Re-scheduling.');
      await schedule(accountId);
      await removeJob(job.id);
      return done();
    }

    // fetch posts
    const facebook = facebookClient({ token: account.accessToken });
    const { body } = await facebook.getPosts(null, { since: account.synced });
    job.progress(2, PROGRESS_TOTAL, 'Fetched facebook posts');

    // save to database
    const posts = await FacebookPost.bulkCreate(body.posts.map(post => ({ ...post, accountId })));
    job.progress(3, PROGRESS_TOTAL, `Created ${posts.length} posts`);

    // update account
    await account.update({ synced: new Date() });
    job.progress(4, PROGRESS_TOTAL, 'Updated account.');

    await schedule(accountId);
    await removeJob(job.id);
    return done();
  } catch (err) {
    debug.error(err);
    await schedule(accountId);
    return done(err);
  }
}
