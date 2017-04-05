/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Account = sequelize.define('Account', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Account ID.',
                        },
  accessToken:          {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Account access token.',
                        },
  tokenSecret:          {
                          type: Sequelize.STRING,
                          comment: 'Account refresh token/token secret.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          validate: {
                            isIn: [['facebook', 'twitter', 'linkedin']],
                          },
                          comment: 'Type of account.',
                        },
  name:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Name of account.',
                        },
  imgUrl:               {
                          type: Sequelize.STRING,
                          comment: 'URL of account image.',
                        },
  synced:               {
                          type: Sequelize.DATE,
                          comment: 'DEPRECATED: Date account was last synced.',
                        },
  jobId:                {
                          type: Sequelize.INTEGER,
                          comment: 'DEPRECATED: Sync job id.',
                        },
}, {
  name: {
    singular: 'account',
    plural: 'accounts',
  },
});

export default Account;
