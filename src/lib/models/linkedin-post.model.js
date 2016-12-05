/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const LinkedInPost = sequelize.define('LinkedInPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'LinkedIn post ID.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'LinkedIn post URL.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'LinkedIn post body.',
                        },
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'LinkedIn post date.',
                        },
  authorName:           {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'LinkedIn post author display name.',
                        },
  authorImgUrl:         {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'LinkedIn post author image URL.',
                        },
  authorUrl:            {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'LinkedIn post author URL.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Additional post data.',
                        },
}, {
  name: {
    singular: 'linkedInPost',
    plural: 'linkedInPosts',
  },
});

export default LinkedInPost;
