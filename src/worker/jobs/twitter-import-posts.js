import { TWITTER_FETCH_DELAY } from 'lib/config';
import { addJob, removeJob } from 'lib/queue';
import { kue as debug } from 'lib/debug';
import { Account, TwitterPost } from 'lib/models';
import twitterClient from 'lib/twitter';
import { syncedRecently } from '../utils';

export function schedule(accountId, immediate) {
  return addJob({
    type: 'twitter-import-posts',
    title: `Twitter Import Posts for ${accountId}`,
    delay: immediate ? 0 : TWITTER_FETCH_DELAY,
    priority: 'low',
    data: { accountId },
  });
}

export default async function twitterImportPostsProcessor(job, done) {
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

    // get latest tweet
    const lastPost = await TwitterPost.findOne({
      include: [{
        model: Account,
        where: { id: accountId },
      }],
      order: [['date', 'DESC']],
    });

    // fetch posts
    const twitter = twitterClient({
      token: account.accessToken,
      tokenSecret: account.tokenSecret,
    });
    const getOptions = lastPost ? { sinceId: lastPost.id } : {};
    const { body } = await twitter.getPosts(getOptions);
    job.progress(2, PROGRESS_TOTAL, 'Fetched twitter posts');

    // save to database
    const posts = await TwitterPost.bulkCreate(body.posts.map(post => ({ ...post, accountId })));
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
