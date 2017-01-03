import { expect } from 'chai';
import sinon from 'sinon';
import { patchController } from './router';

describe('router', () => {
  describe('patchedController()', () => {
    const result = { test: 'test' };
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = {};
      const json = sinon.spy();
      res = {
        locals: {},
        status: sinon.spy(() => ({ json })),
        json,
      };
      next = sinon.spy();
    });

    it('should respond with promise return value', (done) => {
      const controller = patchController((/* req, res, next */) => (
        Promise.resolve(result)
      ));
      controller(req, res, next)
        .then(() => {
          expect(res.status.calledWith(200)).to.equal(true);
          expect(res.json.calledWith(result)).to.equal(true);
          done();
        })
        .catch(done);
    });

    it('should respond with return value', () => {
      const controller = patchController((/* req, res, next */) => (
        result
      ));
      controller(req, res, next);
      expect(res.status.calledWith(200)).to.equal(true);
      expect(res.json.calledWith(result)).to.equal(true);
    });

    it('should call next middleware', () => {
      res.headersSent = false;
      const controller = patchController(() => {});
      controller(req, res, next);
      expect(next.called).to.equal(true);
    });

    it('should use res.locals.status', () => {
      res.locals.status = 201;
      const controller = patchController((/* req, res, next */) => (
        result
      ));
      controller(req, res, next);
      expect(res.status.calledWith(res.locals.status)).to.equal(true);
      expect(res.json.calledWith(result)).to.equal(true);
    });

    it('should return null if headers sent', () => {
      res.headersSent = true;
      const controller = patchController(() => {});
      const returnValue = controller(req, res, next);
      expect(next.called).to.equal(false);
      expect(returnValue).to.equal(null);
    });
  });
});
