/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const FacebookPost = sequelize.define('FacebookPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Facebook post ID.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post body.',
                        },
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post date.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Additional post data.',
                        },
}, {
  name: {
    singular: 'facebookPost',
    plural: 'facebookPosts',
  },
});

export default FacebookPost;
