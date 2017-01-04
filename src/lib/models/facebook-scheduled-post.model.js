/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const FacebookScheduledPost = sequelize.define('FacebookScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Facebook post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Post date.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Message.',
                        },
  link:                 {
                          type: Sequelize.TEXT,
                          comment: 'Link.',
                        },
  picture:              {
                          type: Sequelize.TEXT,
                          comment: 'Link picture URL.',
                        },
  name:                 {
                          type: Sequelize.TEXT,
                          comment: 'Link name.',
                        },
  caption:              {
                          type: Sequelize.TEXT,
                          comment: 'Link caption.',
                        },
  description:          {
                          type: Sequelize.TEXT,
                          comment: 'Link description.',
                        },
  place:                {
                          type: Sequelize.TEXT,
                          comment: 'Facebook place ID.',
                        },
  imgUrl:               {
                          type: Sequelize.TEXT,
                          comment: 'Image URL.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          comment: 'Facebook post URL. Set by worker.',
                        },
  posted:               {
                          type: Sequelize.DATE,
                          comment: 'Facebook posted date. Set by worker.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  getterMethods: {
    type() { return 'facebook'; },
  },
  name: {
    singular: 'facebookScheduledPost',
    plural: 'facebookScheduledPosts',
  },
});

export default FacebookScheduledPost;
