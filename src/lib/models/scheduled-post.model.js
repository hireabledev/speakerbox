/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const ScheduledPost = sequelize.define('ScheduledPost', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          primaryKey: true,
                          comment: 'Scheduled post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          comment: 'Scheduled post date.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          comment: 'Scheduled post job ID.',
                        },
}, {
  name: {
    singular: 'scheduledPost',
    plural: 'scheduledPosts',
  },
});

export default ScheduledPost;
