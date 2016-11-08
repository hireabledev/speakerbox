/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const UserAccount = sequelize.define('UserAccount', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Account ID.',
                        },
  userId:               {
                          type: Sequelize.UUID,
                          allowNull: false,
                          comment: 'User ID.',
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
    singular: 'UserAccount',
    plural: 'UserAccounts',
  },
});

export default UserAccount;
