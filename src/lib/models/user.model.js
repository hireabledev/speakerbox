/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const User = sequelize.define('User', {
  id:                   {
                          type: Sequelize.UUID,
                          defaultValue: Sequelize.UUIDV4,
                          primaryKey: true,
                        },
  email:                {
                          type: Sequelize.STRING,
                          allowNull: true,
                          unique: true,
                          validate: { isEmail: true },
                        },
  emailConfirmed:       {
                          type: Sequelize.BOOLEAN,
                          defaultValue: false,
                        },
  tel:                  {
                          type: Sequelize.STRING,
                          allowNull: true,
                          unique: true,
                          validate: { isNumeric: true },
                        },
  telConfirmed:         {
                          type: Sequelize.BOOLEAN,
                          defaultValue: false,
                        },
  displayName:          {
                          type: Sequelize.STRING,
                          allowNull: false,
                        },
  photoUrl:             {
                          type: Sequelize.STRING,
                          allowNull: true,
                        },
  role:                 {
                          type: Sequelize.STRING,
                          defaultValue: 'user',
                          validate: {
                            isIn: [['user', 'admin']],
                          },
                        },
  facebookId:           {
                          type: Sequelize.STRING,
                          unique: true,
                        },
  facebookToken:        { type: Sequelize.STRING },
  facebookTokenSecret:  { type: Sequelize.STRING },
  twitterId:            {
                          type: Sequelize.STRING,
                          unique: true,
                        },
  twitterToken:         { type: Sequelize.STRING },
  twitterTokenSecret:   { type: Sequelize.STRING },
  linkedinId:           {
                          type: Sequelize.STRING,
                          unique: true,
                        },
  linkedinToken:        { type: Sequelize.STRING },
  linkedinTokenSecret:  { type: Sequelize.STRING },
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
