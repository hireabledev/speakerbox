/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const User = sequelize.define('User', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          primaryKey: true,
                          comment: 'User ID.',
                        },
  email:                {
                          type: Sequelize.STRING,
                          unique: true,
                          validate: { isEmail: true },
                          comment: 'User email.',
                        },
  emailConfirmed:       {
                          type: Sequelize.BOOLEAN,
                          defaultValue: false,
                          comment: 'Has the user verified email by clicking on link.',
                        },
  tel:                  {
                          type: Sequelize.STRING,
                          unique: true,
                          validate: { isNumeric: true },
                          comment: 'User phone number.',
                        },
  telConfirmed:         {
                          type: Sequelize.BOOLEAN,
                          defaultValue: false,
                          comment: 'Has the user verified phone number.',
                        },
  displayName:          {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'User name.',
                        },
  photoUrl:             {
                          type: Sequelize.STRING,
                          comment: 'Link to user image.',
                        },
  role:                 {
                          type: Sequelize.STRING,
                          defaultValue: 'user',
                          allowNull: false,
                          validate: {
                            isIn: [['user', 'admin']],
                          },
                          comment: 'User role.',
                        },
}, {
  name: {
    singular: 'user',
    plural: 'users',
  },
  indexes: [
    { fields: ['email'] },
  ],
  getterMethods: {
    isAdmin() { return this.role === 'admin'; },
  },
});

export default User;
