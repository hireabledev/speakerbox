/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Account = sequelize.define('Account', {
  id:                   {
                          type: Sequelize.STRING,
                          primaryKey: true,
                          comment: 'Account ID.',
                        },
  accessToken:          {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Account access token.',
                        },
  refreshToken:         {
                          type: Sequelize.STRING,
                          comment: 'Account refresh token.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          allowNull: false,
                          validate: {
                            isIn: [['facebook', 'twitter', 'linkedin']],
                          },
                          comment: 'Account type.',
                        },
}, {
  name: {
    singular: 'account',
    plural: 'accounts',
  },
});

export default Account;
