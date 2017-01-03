import { expect } from 'chai';
import sinon from 'sinon';
import { scopeToAccountType } from './account';

describe('account middleware', () => {
  it('should scope to account type', () => {
    const TYPE = 'accountType';
    const middleware = scopeToAccountType(TYPE);
    const req = { query: {} };
    const next = sinon.spy();
    middleware(req, null, next);
    expect(req.query.type).to.equal(TYPE);
    expect(next.called).to.equal(true);
  });
});
