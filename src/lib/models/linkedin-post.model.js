/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const LinkedInPost = sequelize.define('LinkedInPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'LinkedIn post ID.',
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
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Additional post data.',
                        },
}, {
  name: {
    singular: 'linkedinPost',
    plural: 'linkedinPosts',
  },
});

export default LinkedInPost;
