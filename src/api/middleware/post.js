export function favorited(req, res, next) {
  if (req.query.favorited) {
    delete req.query.favorited; // eslint-disable-line no-param-reassign
    res.locals.where = { // eslint-disable-line no-param-reassign
      ...res.locals.where,
      favorited: { $ne: null },
    };
  }
  next();
}

export function posted(req, res, next) {
  if (req.query.posted) {
    delete req.query.posted; // eslint-disable-line no-param-reassign
    res.locals.where = { // eslint-disable-line no-param-reassign
      ...res.locals.where,
      posted: { $ne: null },
    };
  }
  next();
}

export function accountsOrFeeds(req, res, next) {
  const { where } = res.locals;
  if (where.accountId && where.feedId) {
    where.$or = [
      { accountId: { $in: where.accountId } },
      { feedId: { $in: where.feedId } },
    ];
    delete where.accountId;
    delete where.feedId;
  }
  next();
}
