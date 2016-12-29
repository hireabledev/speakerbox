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
  statusId:             {
                          type: Sequelize.INTEGER,
                          allowNull: false,
                          comment: 'Tweet ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'Twitter scheduled retweet date.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  name: {
    singular: 'twitterScheduledRetweet',
    plural: 'twitterScheduledRetweets',
  },
});

export default TwitterScheduledRetweet;
