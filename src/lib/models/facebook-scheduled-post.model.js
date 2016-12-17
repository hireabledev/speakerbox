/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const FacebookScheduledPost = sequelize.define('FacebookScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Facebook post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Facebook post date.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post message.',
                        },
  link:                 {
                          type: Sequelize.TEXT,
                          comment: 'Facebook post link.',
                        },
  place:                {
                          type: Sequelize.TEXT,
                          comment: 'Facebook place ID.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  name: {
    singular: 'facebookScheduledPost',
    plural: 'facebookScheduledPosts',
  },
});

export default FacebookScheduledPost;
