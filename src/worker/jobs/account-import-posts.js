import { ACCOUNT_FETCH_DELAY } from 'lib/config';
import { addJob, removeJob } from 'lib/queue';
import { kue as debug } from 'lib/debug';
import { Account, Post } from 'lib/models';
import { syncedRecently } from '../utils';
import { getAccountPosts } from '../posts';

export async function schedule(account, immediate) {
  const job = await addJob({
    type: 'account-import-posts',
    title: `Import Posts for Account ${account.id}`,
    delay: immediate ? 0 : ACCOUNT_FETCH_DELAY,
    priority: 'low',
    data: { accountId: account.id },
  });
  if (account.isNewRecord === false) {
    if (account.jobId) {
      await removeJob(account.jobId);
    }
    await account.update({ jobId: job.id });
  }
  return job;
}

export default async function accountImportPostsProcessor(job, done) {
  const { accountId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  // get account
  const account = await Account.findById(accountId);
  if (!account) {
    job.log('Account no longer exists.');
    return done();
  }
  job.progress(1, PROGRESS_TOTAL, 'Fetched account');

  try {
    // check if synced recently
    if (syncedRecently(account)) {
      job.log('Account synced recently. Re-scheduling.');
      await schedule(account);
      return done();
    }

    // fetch posts
    const { body } = await getAccountPosts(account);
    job.progress(2, PROGRESS_TOTAL, 'Fetched posts');

    // save to database
    const posts = await Post.bulkCreate(body.posts.map(post => ({ ...post, accountId })));
    job.progress(3, PROGRESS_TOTAL, `Created ${posts.length} posts`);

    // schedule next job and remove old one
    await schedule(account);

    // update account
    await account.update({ synced: new Date() });
    job.progress(4, PROGRESS_TOTAL, 'Updated account.');

    return done();
  } catch (err) {
    debug.error(err);
    await schedule(account);
    return done(err);
  }
}
