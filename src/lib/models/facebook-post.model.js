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
  name: {
    singular: 'facebookPost',
    plural: 'facebookPosts',
  },
});

export default FacebookPost;
