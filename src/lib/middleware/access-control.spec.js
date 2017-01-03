import { expect } from 'chai';
import sinon from 'sinon';
import { authenticated, adminOnly } from './access-control';

describe('middleware', () => {
  describe('authenticated', () => {
    it('should throw unauthorized if no user', () => {
      const req = {};
      try {
        authenticated(req, null);
      } catch (err) {
        expect(err.isBoom).to.equal(true);
      }
    });
    it('should call next if user is present', () => {
      const req = { user: {} };
      const next = sinon.spy();
      authenticated(req, null, next);
      expect(next.called).to.equal(true);
    });
  });
  describe('adminOnly', () => {
    it('should throw if user is not admin', () => {
      const req = { user: {} };
      try {
        adminOnly(req, null);
      } catch (err) {
        expect(err.isBoom).to.equal(true);
      }
    });
    it('should call next if user is admin', () => {
      const req = { user: { isAdmin: true } };
      const next = sinon.spy();
      adminOnly(req, null, next);
      expect(next.called).to.equal(true);
    });
  });
});
