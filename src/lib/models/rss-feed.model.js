/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const RSSFeed = sequelize.define('RSSFeed', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Feed ID.',
                        },
  name:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Feed name.',
                        },
  url:                  {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Feed URL.',
                        },
}, {
  name: {
    singular: 'rssFeed',
    plural: 'rssFeeds',
  },
});

export default RSSFeed;
