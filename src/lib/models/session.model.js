/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Session = sequelize.define('Session', {
  sid:     { type: Sequelize.STRING(32), primaryKey: true, allowNull: false },
  expires: { type: Sequelize.DATE, allowNull: true },
  data:    { type: Sequelize.JSONB, allowNull: true },
}, {
  name: {
    singular: 'Session',
    plural: 'Sessions',
  },
});

export default Session;
