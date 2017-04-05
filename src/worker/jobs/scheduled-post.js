import pick from 'lodash/pick';
import intersection from 'lodash/intersection';
import { Account, Post, ScheduledPost } from 'lib/models';
import { processScheduledPost } from '../posts';

function dataMatches(scheduledPostData, jobData, keys) {
  const sjData = pick(scheduledPostData, intersection(keys, Object.keys(jobData)));
  const jsData = pick(jobData, keys);
  return JSON.stringify(sjData) === JSON.stringify(jsData);
}

export default async function scheduledPostProcessor(job, done) {
  const { id, accountId } = job.data.data;
  const PROGRESS_TOTAL = 4;

  const scheduledPost = await ScheduledPost.findById(id, {
    include: [{ model: Post, as: 'Post' }],
  });
  job.progress(1, PROGRESS_TOTAL, 'Fetched scheduled post');

  if (!scheduledPost) {
    job.log('Scheduled post was removed.');
    return done();
  }

  const scheduledPostData = scheduledPost.get({ plain: true });

  if (scheduledPost.posted || scheduledPost.url) {
    job.log('Scheduled post was already posted.');
    return done();
  }

  const keys = scheduledPost.attributes.filter(v => v !== 'updated');

  if (dataMatches(scheduledPostData, job.data.data, keys) === false) {
    job.log('Scheduled post was updated since this job was created.');
    return done();
  }

  const account = await Account.findById(accountId);
  job.progress(2, PROGRESS_TOTAL, 'Fetched account');

  const { url } = await processScheduledPost(scheduledPostData, account);
  job.progress(3, PROGRESS_TOTAL, 'Published post');

  await scheduledPost.update({
    url,
    posted: new Date(),
  });
  job.progress(4, PROGRESS_TOTAL, 'Updated database');

  return done();
}
