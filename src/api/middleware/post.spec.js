import { expect } from 'chai';
import sinon from 'sinon';
import { favorited, posted } from './post';

describe('post middleware', () => {
  it('should return favorited posts only', () => {
    const req = { query: { favorited: true } };
    const res = { locals: { where: { stillHere: true } } };
    const next = sinon.spy();
    favorited(req, res, next);
    expect(req.query.favorited).to.equal(undefined);
    expect(res.locals.where.stillHere).to.equal(true);
    expect(res.locals.where.favorited).to.deep.equal({ $ne: null });
    expect(next.called).to.equal(true);
  });

  it('should return posted posts only', () => {
    const req = { query: { posted: true } };
    const res = { locals: { where: { stillHere: true } } };
    const next = sinon.spy();
    posted(req, res, next);
    expect(req.query.posted).to.equal(undefined);
    expect(res.locals.where.stillHere).to.equal(true);
    expect(res.locals.where.posted).to.deep.equal({ $ne: null });
    expect(next.called).to.equal(true);
  });
});
