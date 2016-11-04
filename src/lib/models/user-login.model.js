/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const UserLogin = sequelize.define('UserLogin', {
  userId: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
  name:   {
            type: Sequelize.STRING(50),
            primaryKey: true,
          },
  key:    {
            type: Sequelize.STRING(100),
            primaryKey: true,
          },
}, {
  name: {
    singular: 'UserLogin',
    plural: 'UserLogins',
  },
});

export default UserLogin;
