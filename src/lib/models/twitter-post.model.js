/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const TwitterPost = sequelize.define('TwitterPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Twitter post ID.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post body.',
                        },
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post date.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Additional post data.',
                        },
}, {
  name: {
    singular: 'twitterPost',
    plural: 'twitterPosts',
  },
});

export default TwitterPost;
