import { Account } from '../../lib/models';
import twitterClient from '../../lib/twitter';

export default async function twitterScheduledPostProcessor(job, done) {
  const { message, imgUrl, accountId } = job.data.data;

  try {
    const account = await Account.findById(accountId);
    const twitter = twitterClient({
      token: account.accessToken,
      tokenSecret: account.tokenSecret,
    });
    const { data } = await twitter.update(message, imgUrl);
    if (data.errors && data.errors.length) {
      return done(new Error(data.errors.map(err => `${err.message} (${err.code})`).join('\n')));
    }
    return done();
  } catch (err) {
    return done(err);
  }
}
