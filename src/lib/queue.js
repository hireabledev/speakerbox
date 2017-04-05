import kue from 'kue';
import moment from 'moment';
import { REDIS_URL, KUE_CLEANUP_BATCH_SIZE } from './config';
import { kue as debug } from './debug';

const JOB_DOESNT_EXIST_REGEXP = /job.+doesn'?t exist/;

const queue = kue.createQueue({
  redis: REDIS_URL,
});

export function addJob({ type, title, attempts, delay, priority, data }) {
  return new Promise((resolve, reject) => {
    let q = queue.create(type, { title, data });

    if (delay) { q = q.delay(typeof delay === 'string' ? new Date(delay) : delay); }
    if (priority) { q = q.priority(priority); }
    if (attempts) {
      q = q.attempts(attempts).backoff({ type: 'exponential' });
    }

    return q.save(err => {
      if (err) { return reject(err); }
      debug.info(`Added job to queue (title: ${title}, type: ${type}).`);
      return resolve(q);
    });
  });
}

export function removeJob(jobId) {
  if (!jobId) { return Promise.resolve(null); }
  return new Promise((resolve, reject) => (
    kue.Job.get(jobId, (err, job) => {
      if (err) {
        if (JOB_DOESNT_EXIST_REGEXP.test(err.message)) {
          debug.warn(err.message);
          return resolve(null);
        }
        return reject(err);
      }
      /* eslint-disable no-shadow */
      return job.remove(err => {
        if (err) { return reject(err); }
        return resolve(job);
      });
      /* eslint-enable no-shadow */
    })
  ));
}

export function cleanupJobsByState(state, minutes = 60) {
  return new Promise((resolve, reject) => {
    const CLEANUP_TIME = moment().subtract(minutes, 'minutes');
    kue.Job.rangeByState(state, 0, KUE_CLEANUP_BATCH_SIZE, 'asc', (err, jobs) => {
      if (err) { return reject(err); }
      const oldJobs = jobs.filter(job => CLEANUP_TIME.isAfter(parseInt(job.created_at, 10)));
      return Promise.all(oldJobs.map(oldJob => removeJob(oldJob.id)))
        .then(removedJobs => {
          debug.info(`Removed ${removedJobs.length} ${state} jobs.`);
          if (removedJobs.length >= KUE_CLEANUP_BATCH_SIZE) {
            return cleanupJobsByState(state, minutes);
          }
          return resolve(removedJobs);
        })
        .catch(reject);
    });
  });
}

export function cleanupJobs() {
  return Promise.all([
    cleanupJobsByState('complete', 1),
    cleanupJobsByState('failed', 60 * 24 * 3),
  ]);
}

export default queue;
