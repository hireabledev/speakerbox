/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const LinkedinScheduledPost = sequelize.define('LinkedinScheduledPost', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Linkedin scheduled post ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Linkedin scheduled post date.',
                        },
  contentTitle:         {
                          type: Sequelize.STRING,
                          comment: 'Linkedin scheduled post content title.',
                        },
  contentDescription:   {
                          type: Sequelize.STRING,
                          comment: 'Linkedin scheduled post content description.',
                        },
  contentUrl:           {
                          type: Sequelize.STRING,
                          comment: 'Linkedin scheduled post content submitted URL.',
                        },
  contentImgUrl:        {
                          type: Sequelize.STRING,
                          comment: 'Linkedin scheduled post content submitted image URL.',
                        },
  message:              {
                          type: Sequelize.STRING,
                          comment: 'Linkedin scheduled post comment.',
                        },
  visibility:         {
                          type: Sequelize.STRING,
                          defaultValue: 'anyone',
                          allowNull: false,
                          validate: {
                            isIn: [['anyone', 'connections-only']],
                          },
                          comment: 'Linkedin scheduled post visibility.',
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
    type() { return 'linkedin'; },
  },
  name: {
    singular: 'linkedinScheduledPost',
    plural: 'linkedinScheduledPosts',
  },
});

export default LinkedinScheduledPost;
