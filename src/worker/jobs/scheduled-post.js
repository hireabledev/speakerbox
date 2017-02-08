import { Account, Post, ScheduledPost } from 'lib/models';
import { processScheduledPost } from '../posts';

export default async function scheduledPostProcessor(job, done) {
  const { id, accountId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  const scheduledPost = await ScheduledPost.findById(id, {
    include: [{ model: Post, as: 'Post' }],
  });
  job.progress(1, PROGRESS_TOTAL, 'Fetched schedued post');

  const account = await Account.findById(accountId);
  job.progress(2, PROGRESS_TOTAL, 'Fetched account');

  const { url } = await processScheduledPost(scheduledPost, account);
  job.progress(3, PROGRESS_TOTAL, 'Published post');

  await scheduledPost.update({
    url,
    posted: new Date(),
    jobId: null,
  });
  job.progress(4, PROGRESS_TOTAL, 'Updated database');

  return done();
}
