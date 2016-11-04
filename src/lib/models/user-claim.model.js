/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const UserClaim = sequelize.define('UserClaim', {
  userId: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
  type:   {
            type: Sequelize.STRING,
          },
  value:  {
            type: Sequelize.STRING(4000),
          },
}, {
  name: {
    singular: 'UserClaim',
    plural: 'UserClaims',
  },
});

export default UserClaim;
