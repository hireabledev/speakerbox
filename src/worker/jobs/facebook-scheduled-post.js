import { Account, FacebookScheduledPost } from '../../lib/models';
import facebookClient from '../../lib/facebook';

export default async function facebookScheduledPostProcessor(job, done) {
  const { message, imgUrl, scheduledPostId, accountId } = job.data.data;

  try {
    const account = await Account.findById(accountId);
    const facebook = facebookClient({
      token: account.accessToken,
    });
    const { body } = await facebook.publish(accountId, {
      message,
      imgUrl,
    });
    const scheduledPost = await FacebookScheduledPost.findById(scheduledPostId);
    await scheduledPost.update({
      url: body.link,
    });
    return done();
  } catch (err) {
    return done(err);
  }
}
