import kue from 'kue';
import moment from 'moment';
import { REDIS_URL } from './config';
import { kue as debug } from './debug';

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
  return new Promise((resolve, reject) => (
    kue.Job.get(jobId, (err, job) => {
      if (err) { return reject(err); }
      /* eslint-disable no-shadow */
      return job.remove(err => {
        if (err) { return reject(err); }
        return resolve(job);
      });
      /* eslint-enable no-shadow */
    })
  ));
}

export function cleanupJobs() {
  return new Promise((resolve, reject) => {
    const CLEANUP_TIME = moment().subtract(1, 'hour');
    kue.Job.rangeByState('complete', 0, 1000, 'asc', (err, jobs) => {
      if (err) { return reject(err); }
      const oldJobs = jobs.filter(job => CLEANUP_TIME.isAfter(parseInt(job.created_at, 10)));
      return Promise.all(oldJobs.map(oldJob => removeJob(oldJob.id)))
        .then(removedJobs => {
          debug.info(`Removed ${removedJobs.length} jobs.`);
          return resolve(removedJobs);
        })
        .catch(reject);
    });
  });
}

export default queue;
