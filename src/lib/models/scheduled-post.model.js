/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const ScheduledPost = sequelize.define('ScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Scheduled post ID.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          validate: {
                            isIn: [['facebook', 'twitter', 'linkedin']],
                          },
                          comment: 'Type of scheduled post.',
                        },
  posted:               {
                          type: Sequelize.DATE,
                          comment: 'Date post was published.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          comment: 'Date post should be published.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          comment: 'Scheduled post message.',
                        },
  imgUrl:               {
                          type: Sequelize.TEXT,
                          comment: 'Scheduled post image URL.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Scheduled post data.',
                        },
  jobId:                {
                          type: Sequelize.INTEGER,
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
