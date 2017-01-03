import { Account, LinkedinScheduledPost } from '../../lib/models';
import linkedinClient from '../../lib/linkedin';

export default async function linkedinScheduledPostProcessor(job, done) {
  const { message, imgUrl, scheduledPostId, accountId } = job.data.data;

  try {
    const account = await Account.findById(accountId);
    const linkedin = linkedinClient({
      token: account.accessToken,
    });
    const { body } = await linkedin.share(null, {
      comment: message,
      imgUrl,
    });
    const scheduledPost = await LinkedinScheduledPost.findById(scheduledPostId);
    await scheduledPost.update({
      url: body.updateUrl,
    });
    return done();
  } catch (err) {
    return done(err);
  }
}
