import ua from 'universal-analytics';
import { GA_ID } from 'lib/config';
import { analytics as debug } from 'lib/debug';

function MockVisitor() {
  this.pageview = (...args) => {
    debug.info(`pageview ${JSON.stringify(args)}`);
    return new MockVisitor();
  };
  this.screenview = (...args) => {
    debug.info(`screenview ${JSON.stringify(args)}`);
    return new MockVisitor();
  };
  this.event = (...args) => {
    debug.info(`event ${JSON.stringify(args)}`);
    return new MockVisitor();
  };
  this.transaction = (...args) => {
    debug.info(`transaction ${JSON.stringify(args)}`);
    return new MockVisitor();
  };
  this.item = (...args) => {
    debug.info(`item ${JSON.stringify(args || {})}`);
    return new MockVisitor();
  };
}

MockVisitor.prototype.send = () => {};

const mockMiddleware = (req, res, next) => {
  req.visitor = new MockVisitor();
  next();
};

const middleware = ua.middleware(GA_ID);

export default GA_ID ? middleware : mockMiddleware;
