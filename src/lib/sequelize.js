import os from 'os';
import Sequelize from 'sequelize';
import { intersection, startCase } from 'lodash';
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
        const where = userId ? { where: { id: userId } } : {};
        return {
          include: [{
            model: this.sequelize.models.User,
            ...where,
          }],
        };
      },

      accountUser(userId) {
        const where = userId ? { where: { userId } } : {};
        return {
          include: [{
            model: this.sequelize.models.Account,
            ...where,
          }],
        };
      },

      feedUser(userId) {
        const where = userId ? { where: { userId } } : {};
        return {
          include: [{
            model: this.sequelize.models.RSSFeed,
            ...where,
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
            return this.scope({ method: 'user' });
          }
          return this.scope({ method: ['user', queryUser] });
        }
        return this.scope({ method: ['user', user.id] });
      },

      scopeForUserAccounts(user, queryUser) {
        if (user.isAdmin && queryUser) {
          if (queryUser === 'all') {
            return this.scope({ method: 'accountUser' });
          }
          return this.scope({ method: ['accountUser', queryUser] });
        }
        return this.scope({ method: ['accountUser', user.id] });
      },

      scopeForUserFeeds(user, queryUser) {
        if (user.isAdmin && queryUser) {
          if (queryUser === 'all') {
            return this.scope({ method: 'feedUser' });
          }
          return this.scope({ method: ['feedUser', queryUser] });
        }
        return this.scope({ method: ['feedUser', user.id] });
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
