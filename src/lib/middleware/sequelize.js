/* eslint "no-param-reassign": 0 */

function getValidAttributes(model, attributes) {

}

export function where(req, res, next) {
  res.locals.where = res.locals.where || {};
  next();
}

export function created(req, res, next) {
  /* eslint "no-shadow": 0 */
  const where = res.locals.where;

  if (req.query.start || req.query.end) {
    where.created = {};

    if (req.query.start) {
      where.created = { $gte: req.query.start };
    }
    if (req.query.end) {
      where.created = { $lt: req.query.end };
    }
  }

  next();
}

export function attributes(req, res, next) {
  if (req.query.attributes) {
    res.locals.attributes = req.query.attributes.split(',');
  }
  next();
}
