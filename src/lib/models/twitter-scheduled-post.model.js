/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const TwitterScheduledPost = sequelize.define('TwitterScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Twitter scheduled post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Tweet date.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Tweet message.',
                        },
  imgUrl:               {
                          type: Sequelize.TEXT,
                          comment: 'Image URL.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  getterMethods: {
    type() { return 'twitter'; },
  },
  name: {
    singular: 'twitterScheduledPost',
    plural: 'twitterScheduledPosts',
  },
});

export default TwitterScheduledPost;
