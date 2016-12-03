import globby from 'globby';
import path from 'path';
import { worker as debug } from '../lib/debug';
import sentry from '../lib/sentry';
import queue from '../lib/queue';
import { sequelize } from '../lib/models';

sentry.patchGlobal(() => {
  debug.error('FATAL ERROR');
  process.exit(1);
});

queue.on('error', err => {
  debug.error(err);
  sentry.captureException(err);
});

process.once('SIGTERM', () => {
  queue.shutdown(5000, err => {
    if (err) {
      debug.error('Kue shutdown error:', err);
      return process.exit(1);
    }
    debug.info('Kue shutdown successfully.');
    return process.exit(0);
  });
});

queue.watchStuckJobs(10000);

function safetyWrapJob(fn) {
  return (job, done) => {
    try {
      return fn(job, done);
    } catch (err) {
      debug.error(err);
      sentry.captureException(err);
      return done(new Error(err.message));
    }
  };
}

debug.info('Kue loading models...');

sequelize.sync()
  .then(() => {
    debug.info('Kue loading jobs...');
    return globby([
      path.join(__dirname, '/jobs/*.js'),
    ])
      .then(paths => {
        /* eslint global-require: 0, "import/no-dynamic-require": 0 */
        paths.forEach(filePath => {
          const name = path.basename(filePath, '.js');
          queue.process(name, 10, safetyWrapJob(require(filePath).default));
        });
        debug.info('Kue ready.');
      });
  })
  .catch(err => sentry.captureException(err));
