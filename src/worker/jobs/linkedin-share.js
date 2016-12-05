import { Account } from '../../lib/models';
import linkedinClient from '../../lib/linkedin';

export default async function twitterRetweetProcessor(job, done) {
  const postId = job.data.data.id;
  const accountId = job.data.data.accountId;

  try {
    const account = await Account.findById(accountId);
    const linkedin = linkedinClient({
      token: account.accessToken,
    });
    await linkedin.share(postId);
    return done();
  } catch (err) {
    return done(err);
  }
}
