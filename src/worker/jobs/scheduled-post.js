import { kue as debug } from 'lib/debug';
import { Account, Post, ScheduledPost } from 'lib/models';
import { processScheduledPost } from '../posts';

export default async function scheduledPostProcessor(job, done) {
  const { id, accountId } = job.data.data;

  try {
    const scheduledPost = await ScheduledPost.findById(id, {
      include: [{ model: Post, as: 'Post' }],
    });
    const account = await Account.findById(accountId);
    const { url } = await processScheduledPost(scheduledPost, account);
    await scheduledPost.update({
      url,
      posted: new Date(),
      jobId: null,
    });
    return done();
  } catch (err) {
    debug.error(err);
    return done(err);
  }
}
