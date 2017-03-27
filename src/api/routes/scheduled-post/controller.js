import uuid from 'uuid';

export async function index(req, res, next) {
  const ScheduledPost = req.app.models.ScheduledPost;
  const { limit, skip, where, attributes, sort } = res.locals;

  const scheduledPosts = await ScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findAll({
      limit: limit + 1,
      offset: skip,
      where,
      attributes: ScheduledPost.getValidAttributes(attributes),
      order: sort,
      include: [{
        model: req.app.models.Post,
        as: 'Post',
      }],
    });

  return {
    data: scheduledPosts.slice(0, limit),
    more: scheduledPosts.length > limit,
  };
}

export async function show(req) {
  return await req.app.models.ScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findOneOr404({
      where: { id: req.params.id },
      include: [{
        model: req.app.models.Post,
        as: 'Post',
      }],
    });
}

export async function create(req) {
  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.body.accountId);

  const body = {
    ...req.body,
    date: req.body.date || new Date(),
    type: account.type,
    id: uuid.v4(),
  };

  const scheduledPost = req.app.models.ScheduledPost.build(body);

  if (req.body.postId) {
    const post = await req.app.models.Post
      .scopeForUserAccountsOrFeeds(req.user, req.query.user)
      .findByIdOr404(req.body.postId);
    scheduledPost.setPost(post);
    body.postId = req.body.postId;
  }

  // TODO: use a common schedule function
  const job = await req.app.addJob({
    type: 'scheduled-post',
    title: `Scheduled Post ${scheduledPost.id}`,
    delay: body.date,
    data: {
      ...body,
      accountId: account.id,
    },
  });

  scheduledPost.jobId = job.id;
  scheduledPost.setAccount(account);

  try {
    return await scheduledPost.save();
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function update(req) {
  const scheduledPost = await req.app.models.ScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findOneOr404({
      where: { id: req.params.id },
      include: [{
        model: req.app.models.Post,
        as: 'Post',
      }],
    });

  const account = await req.app.models.Account
    .scopeForUser(req.user, req.query.user)
    .findByIdOr404(req.body.accountId || scheduledPost.accountId);

  const body = {
    ...req.body,
    date: req.body.date || scheduledPost.date,
    type: account.type,
  };

  const oldJob = await req.app.removeJob(scheduledPost.jobId) || { data: { data: {} } };

  const job = await req.app.addJob({
    type: 'scheduled-post',
    title: `Scheduled Post ${scheduledPost.id}`,
    delay: body.date,
    data: {
      ...oldJob.data.data,
      ...body,
      id: scheduledPost.id,
      accountId: oldJob.data.data.accountId,
      feedId: oldJob.data.data.feedId,
    },
  });

  try {
    return await scheduledPost.update({ ...body, date: body.date, jobId: job.id });
  } catch (err) {
    await req.app.removeJob(job.id);
    throw err;
  }
}

export async function remove(req) {
  const scheduledPost = await req.app.models.ScheduledPost
    .scopeForUserAccounts(req.user, req.query.user)
    .findOneOr404({
      where: { id: req.params.id },
      include: [{
        model: req.app.models.Post,
        as: 'Post',
      }],
    });
  await req.app.removeJob(scheduledPost.jobId);
  await scheduledPost.destroy();
  return scheduledPost;
}
