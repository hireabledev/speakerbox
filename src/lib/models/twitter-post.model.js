/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const TwitterPost = sequelize.define('TwitterPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Twitter post ID.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post URL.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post status.',
                        },
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post date.',
                        },
  authorName:           {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Twitter post author display name.',
                        },
  authorImgUrl:         {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post author image URL.',
                        },
  authorUrl:            {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Twitter post author URL.',
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
