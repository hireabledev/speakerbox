/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const RSSPost = sequelize.define('RSSPost', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'RSS post ID.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          comment: 'RSS post URL.',
                        },
  body:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'RSS post body.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          comment: 'RSS post date.',
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
    type() { return 'rss'; },
  },
  name: {
    singular: 'rssPost',
    plural: 'rssPosts',
  },
});

export default RSSPost;
