/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const TwitterScheduledPost = sequelize.define('TwitterScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Twitter post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Tweet date.',
                        },
  status:               {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Tweet body.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  name: {
    singular: 'twitterScheduledPost',
    plural: 'twitterScheduledPosts',
  },
});

export default TwitterScheduledPost;
