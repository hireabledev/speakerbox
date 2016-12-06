import {
  indexBlueprint,
  showBlueprint,
} from '../../blueprints/post';

const JOB_TYPE = 'linkedin-share';

export const index = indexBlueprint('LinkedInShare');
export const show = showBlueprint('LinkedInShare');

export async function create(req) {
  const post = await req.app.models.LinkedInPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.body.postId);
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(post.accountId);
  const date = req.body.date || new Date();
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Share on LinkedIn ${post.id}`,
    delay: date,
    data: {
      ...req.body,
      postId: post.id,
      accountId: account.id,
    },
  });
  const share = req.app.models.LinkedInShare.build({
    date,
    jobId: job.id,
  });
  share.setLinkedInPost(post);
  share.setAccount(account);
  try {
    return await share.save();
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function update(req) {
  const share = await req.app.models.LinkedInShare
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  const oldJob = await req.app.removeJob(share.jobId);
  const date = req.body.date || share.date;
  const job = await req.app.addJob({
    type: JOB_TYPE,
    title: `Share on LinkedIn ${share.linkedInPostId}`,
    delay: date,
    data: {
      ...oldJob.data.data,
      ...req.body,
      postId: oldJob.data.data.postId,
      accountId: oldJob.data.data.accountId,
    },
  });
  try {
    return await share.update({
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
  const share = await req.app.models.LinkedInShare
    .scopeForUserAccounts(req.user, req.query.user)
    .findByIdOr404(req.params.id);
  await req.app.removeJob(share.jobId);
  return await share.destroy();
}
