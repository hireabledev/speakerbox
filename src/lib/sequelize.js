import os from 'os';
import Sequelize from 'sequelize';
import { assign, intersection, startCase } from 'lodash';
import { notFound } from 'boom';
import { ENV } from './config';

const config = require('./config/db')[ENV];

const sequelize = new Sequelize(config.url, {
  pool: {
    max: os.cpus().length,
    min: 0,
    idle: 10000,
  },

  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    deletedAt: 'deleted',

    scopes: {

      user(userId) {
        return {
          include: [{
            model: this.sequelize.models.User,
            where: { id: userId },
            as: 'user',
          }],
        };
      },

    },

    classMethods: {

      findOneOr404(...args) {
        return this.findOne(...args)
          .then(item => {
            if (!item) {
              throw notFound(`${startCase(this.name)} not found`);
            }
            return item;
          });
      },

      findByIdOr404(...args) {
        return this.findById(...args)
          .then(item => {
            if (!item) {
              throw notFound(`${startCase(this.name)} not found`);
            }
            return item;
          });
      },

      scopeForUser(user, queryUser) {
        if (user.isAdmin && queryUser) {
          if (queryUser === 'all') {
            return this;
          }
          return this.scope({ method: ['user', queryUser] });
        }
        return this.scope({ method: ['user', user.id] });
      },

      getValidAttributes(attributes) {
        const allAttributes = Object.keys(this.attributes);
        return attributes ? intersection(allAttributes, attributes) : attributes;
      },

    },
  },
});

export { Sequelize };
export default sequelize;
