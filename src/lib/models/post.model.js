/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Post = sequelize.define('Post', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          primaryKey: true,
                          comment: 'Post ID.',
                        },
  userId:               {
                          type: Sequelize.UUID,
                          allowNull: false,
                          comment: 'User ID.',
                        },
  title:                {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Post title.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          comment: 'Post body.',
                        },
  data:                 {
                          type: Sequelize.JSONB,
                          defaultValue: '{}',
                          comment: 'Additional post data.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          defaultValue: 'rss',
                          allowNull: false,
                          validate: {
                            isIn: [['rss', 'facebook', 'twitter', 'linkedin']],
                          },
                          comment: 'Post type.',
                        },
}, {
  name: {
    singular: 'Post',
    plural: 'Posts',
  },
  indexes: [
    { fields: ['title', 'type'] },
  ],
});

export default Post;
