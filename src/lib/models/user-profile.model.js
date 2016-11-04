/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const UserProfile = sequelize.define('UserProfile', {
  userId:   {
              type: Sequelize.UUID,
              primaryKey: true,
            },
  name:     {
              type: Sequelize.STRING,
              allowNull: false,
            },
  location: {
              type: Sequelize.STRING,
            },
}, {
  name: {
    singular: 'UserProfile',
    plural: 'UserProfiles',
  },
});

export default UserProfile;
