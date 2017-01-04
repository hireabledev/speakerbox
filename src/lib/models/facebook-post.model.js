/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const FacebookPost = sequelize.define('FacebookPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Facebook post ID.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post URL.',
                        },
  message:              {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post message.',
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
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post date.',
                        },
  authorName:           {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Facebook post author display name.',
                        },
  authorImgUrl:           {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post author image URL.',
                        },
  authorUrl:            {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Facebook post author URL.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          allowNull: false,
                          defaultValue: {},
                          comment: 'Additional post data.',
                        },
  favorited:            {
                          type: Sequelize.DATE,
                          comment: 'Favorited date.',
                        },
}, {
  getterMethods: {
    type() { return 'facebook'; },
  },
  name: {
    singular: 'facebookPost',
    plural: 'facebookPosts',
  },
});

export default FacebookPost;
