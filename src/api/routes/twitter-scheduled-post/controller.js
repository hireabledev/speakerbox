import {
  indexBlueprint,
  showBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'twitter-scheduled-post';

export const index = indexBlueprint('TwitterScheduledPost');
export const show = showBlueprint('TwitterScheduledPost');

export async function create(req) {
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.body.accountId);
  const date = req.body.date || new Date();
  const post = req.app.models.TwitterScheduledPost.build({ date });
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Post on Twitter ${post.id}`,
    delay: date,
    data: {
      ...req.body,
      accountId: account.id,
    },
  });
  post.jobId = job.id;
  post.setAccount(account);
  try {
    return await post.save();
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function update(req) {
  const post = await req.app.models.TwitterScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  const date = req.body.date || post.date;
  const oldJob = await req.app.removeJob(post.jobId);
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Post on Twitter ${post.id}`,
    delay: date,
    data: {
      ...oldJob.data.data,
      ...req.body,
      accountId: oldJob.data.data.accountId,
    },
  });
  try {
    return await post.update({
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
  const share = await req.app.models.TwitterScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  await req.app.removeJob(share.jobId);
  return await share.destroy();
}
