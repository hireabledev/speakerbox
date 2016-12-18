import {
  indexBlueprint,
  showBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'twitter-scheduled-retweet';

export const index = indexBlueprint('TwitterScheduledRetweet');
export const show = showBlueprint('TwitterScheduledRetweet');

export async function create(req) {
  const post = await req.app.models.TwitterPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.body.postId);
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(post.accountId);
  const date = req.body.date || new Date();
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Retweet ${post.id}`,
    delay: date,
    data: {
      ...req.body,
      postId: post.id,
      accountId: account.id,
    },
  });
  const retweet = req.app.models.TwitterScheduledRetweet.build({
    date,
    jobId: job.id,
  });
  retweet.setTwitterPost(post);
  retweet.setAccount(account);
  try {
    return await retweet.save();
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function update(req) {
  const retweet = await req.app.models.TwitterScheduledRetweet
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  const date = req.body.date || retweet.date;
  const oldJob = await req.app.removeJob(retweet.jobId);
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Retweet ${retweet.twitterPostId}`,
    delay: date,
    data: {
      ...oldJob.data.data,
      ...req.body,
      postId: oldJob.data.data.postId,
      accountId: oldJob.data.data.accountId,
    },
  });
  try {
    return await retweet.update({
      ...req.body,
      date,
      jobId: job.id,
    });
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function remove(req) {
  const retweet = await req.app.models.TwitterScheduledRetweet
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  await req.app.removeJob(retweet.jobId);
  return await retweet.destroy();
}
