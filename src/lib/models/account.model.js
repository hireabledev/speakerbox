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
