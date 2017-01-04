import { kue as debug } from 'lib/debug';
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
      posted: new Date(),
    });
    return done();
  } catch (err) {
    debug.error(err);
    return done(err);
  }
}
