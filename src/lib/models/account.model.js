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
                          comment: 'Account type.',
                        },
  name:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Account name.',
                        },
  synced:               {
                          type: Sequelize.DATE,
                          comment: 'Last synced date.',
                        },
  imgUrl:               {
                          type: Sequelize.STRING,
                          comment: 'Account image URL.',
                        },
}, {
  name: {
    singular: 'account',
    plural: 'accounts',
  },
});

export default Account;
