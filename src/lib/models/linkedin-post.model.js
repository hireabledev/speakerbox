/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const LinkedinPost = sequelize.define('LinkedinPost', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Linkedin post ID.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Linkedin post URL.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Linkedin post body.',
                        },
  date:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Linkedin post date.',
                        },
  authorName:           {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Linkedin post author display name.',
                        },
  authorImgUrl:         {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Linkedin post author image URL.',
                        },
  authorUrl:            {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Linkedin post author URL.',
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
    type() { return 'linkedin'; },
  },
  name: {
    singular: 'linkedinPost',
    plural: 'linkedinPosts',
  },
});

export default LinkedinPost;
