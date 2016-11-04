import kue from 'kue';
import { assign } from 'lodash';
import { REDIS_URL } from './config';
import { kue as debug } from './debug';

const queue = kue.createQueue({
  redis: REDIS_URL,
});

export function enqueue(type, title, data) {
  return new Promise((resolve, reject) => {
    queue.create(type, assign({ title }, data))
      .save(err => {
        if (err) { return reject(err); }
        debug.info(`Added job to queue (title: ${title}, type: ${type}).`);
        return resolve();
      });
  });
}

export default queue;
