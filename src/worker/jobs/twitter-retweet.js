import { Account } from '../../lib/models';
import twitterClient from '../../lib/twitter';

export default async function twitterRetweetProcessor(job, done) {
  const postId = job.data.data.id;
  const accountId = job.data.data.accountId;

  try {
    const account = await Account.findById(accountId);
    const twitter = twitterClient({
      token: account.accessToken,
      tokenSecret: account.refreshToken,
    });
    const { data } = await twitter.retweet(postId);
    if (data.errors && data.errors.length) {
      return done(new Error(data.errors.map(err => `${err.message} (${err.code})`).join('\n')));
    }
    return done();
  } catch (err) {
    return done(err);
  }
}
