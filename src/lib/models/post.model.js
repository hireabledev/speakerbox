/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Post = sequelize.define('Post', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Post ID.',
                        },
  nativeId:             {
                          type: Sequelize.STRING,
                          allowNull: false,
                          index: true,
                          comment: 'ID of post on social network.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          validate: {
                            isIn: [['facebook', 'twitter', 'linkedin', 'rss']],
                          },
                          comment: 'Type of post.',
                        },
  favorited:            {
                          type: Sequelize.DATE,
                          comment: 'Date post was favorited.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          comment: 'Date post was published.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Post URL.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Post message.',
                        },
  authorName:           {
                          type: Sequelize.TEXT,
                          comment: 'Post author name.',
                        },
  authorUrl:            {
                          type: Sequelize.TEXT,
                          comment: 'Post author URL.',
                        },
  authorImgUrl:         {
                          type: Sequelize.TEXT,
                          comment: 'Post author image URL.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Post data.',
                        },
}, {
  name: {
    singular: 'post',
    plural: 'posts',
  },
  indexes: [{
    unique: true,
    fields: ['url', 'feedId'],
  }],
});

export default Post;
