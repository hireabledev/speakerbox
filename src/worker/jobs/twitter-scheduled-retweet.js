import { kue as debug } from 'lib/debug';
import { Account, TwitterScheduledRetweet } from '../../lib/models';
import twitterClient from '../../lib/twitter';

export default async function twitterScheduledRetweetProcessor(job, done) {
  const { statusId, scheduledPostId, accountId } = job.data.data;

  try {
    const account = await Account.findById(accountId);
    const twitter = twitterClient({
      token: account.accessToken,
      tokenSecret: account.tokenSecret,
    });
    const { data } = await twitter.retweet(statusId);
    if (data.errors && data.errors.length) {
      throw new Error(data.errors.map(err => `${err.message} (${err.code})`).join('\n'));
    }
    const scheduledPost = await TwitterScheduledRetweet.findById(scheduledPostId);
    await scheduledPost.update({
      url: `https://twitter.com/${data.user.screen_name}/status/${data.id_str}`,
      posted: new Date(),
    });
    return done();
  } catch (err) {
    debug.error(err);
    return done(err);
  }
}
