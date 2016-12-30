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
  linkPicture:          {
                          type: Sequelize.TEXT,
                          comment: 'Link picture URL.',
                        },
  linkName:             {
                          type: Sequelize.TEXT,
                          comment: 'Link name.',
                        },
  linkCaption:          {
                          type: Sequelize.TEXT,
                          comment: 'Link caption.',
                        },
  linkDescription:      {
                          type: Sequelize.TEXT,
                          comment: 'Link description.',
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
  getterMethods: {
    type() { return 'facebook'; },
  },
  name: {
    singular: 'facebookScheduledPost',
    plural: 'facebookScheduledPosts',
  },
});

export default FacebookScheduledPost;
