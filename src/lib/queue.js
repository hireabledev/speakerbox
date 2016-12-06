import kue from 'kue';
import { REDIS_URL } from './config';
import { kue as debug } from './debug';

const queue = kue.createQueue({
  redis: REDIS_URL,
});

export function addJob({ type, title, attempts, delay, priority, data }) {
  return new Promise((resolve, reject) => {
    let q = queue.create(type, { title, data });

    if (delay) { q = q.delay(delay); }
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

export default queue;
