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
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Scheduled post date.',
                        },
  action:               {
                          type: Sequelize.STRING,
                          allowNull: false,
                          validate: {
                            isIn: [[
                              'TWITTER_RETWEET',
                              'LINKEDIN_SHARE',
                            ]],
                          },
                          comment: 'Scheduled action.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          comment: 'Scheduled action data.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  name: {
    singular: 'scheduledPost',
    plural: 'scheduledPosts',
  },
});

export default ScheduledPost;
