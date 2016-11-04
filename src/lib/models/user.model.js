/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const User = sequelize.define('User', {
  id:             {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                  },
  email:          {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    validate: { isEmail: true },
                  },
  emailConfirmed: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                  },
  tel:            {
                    type: Sequelize.STRING,
                    allowNull: true,
                    unique: true,
                    validate: { isNumeric: true },
                  },
  telConfirmed: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                  },
  role:           {
                    type: Sequelize.STRING,
                    defaultValue: 'user',
                    validate: {
                      isIn: [['user', 'admin']],
                    },
                  },
}, {
  name: {
    singular: 'User',
    plural: 'Users',
  },
  indexes: [
    { fields: ['email'] },
  ],
  getterMethods: {
    isAdmin() { return this.role === 'admin'; },
  },
});

export default User;
