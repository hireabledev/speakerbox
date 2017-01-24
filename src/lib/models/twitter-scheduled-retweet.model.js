/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const TwitterScheduledRetweet = sequelize.define('TwitterScheduledRetweet', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Twitter scheduled retweet ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Twitter scheduled retweet date.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          comment: 'Twitter retwet URL. Set by worker.',
                        },
  posted:               {
                          type: Sequelize.DATE,
                          comment: 'Twitter retweeted date. Set by worker.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  getterMethods: {
    type() { return 'twitter'; },
  },
  name: {
    singular: 'twitterScheduledRetweet',
    plural: 'twitterScheduledRetweets',
  },
});

export default TwitterScheduledRetweet;
