/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Feed = sequelize.define('Feed', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Feed ID.',
                        },
  name:                 {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Name of feed.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'URL of feed.',
                        },
  synced:               {
                          type: Sequelize.DATE,
                          comment: 'DEPRECATED: Date feed was last synced.',
                        },
  jobId:                {
                          type: Sequelize.INTEGER,
                          comment: 'DEPRECATED: Sync job id.',
                        },
}, {
  name: {
    singular: 'feed',
    plural: 'feeds',
  },
});

export default Feed;
