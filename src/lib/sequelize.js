import os from 'os';
import mapKeys from 'lodash/mapKeys';
import Sequelize from 'sequelize';
import { intersection, startCase } from 'lodash';
import { notFound } from 'boom';
import { ENV } from './config';

function toJSON() {
  return mapKeys(this.get(), (key, value) => (
    value.charAt(0).toLowerCase() + value.slice(1)
  ));
}

const config = require('./config/db')[ENV];

const sequelize = new Sequelize(config.url, {
  dialectOptions: config.dialectOptions,

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
            as: 'User',
            ...where,
          }],
        };
      },

      accountUser(userId) {
        const where = userId ? { where: { userId } } : {};
        return {
          include: [{
            model: this.sequelize.models.Account,
            as: 'Account',
            ...where,
          }],
        };
      },

      feedUser(userId) {
        const where = userId ? { where: { userId } } : {};
        return {
          include: [{
            model: this.sequelize.models.Feed,
            as: 'Feed',
            ...where,
          }],
        };
      },

      accountOrFeedUser(userId) {
        const where = userId
          ? {
            $or: {
              '$Account.userId$': userId,
              '$Feed.userId$': userId,
            },
          }
          : {};
        return {
          where,
          include: [
            {
              model: this.sequelize.models.Account,
              as: 'Account',
            },
            {
              model: this.sequelize.models.Feed,
              as: 'Feed',
            },
            {
              model: this.sequelize.models.ScheduledPost,
              as: 'ScheduledPost',
            },
          ],
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

      scopeForUserAccountsOrFeeds(user, queryUser) {
        if (user.isAdmin && queryUser) {
          if (queryUser === 'all') {
            return this.scope({ method: 'accountOrFeedUser' });
          }
          return this.scope({ method: ['accountOrFeedUser', queryUser] });
        }
        return this.scope({ method: ['accountOrFeedUser', user.id] });
      },

      getValidAttributes(attributes) {
        const allAttributes = Object.keys(this.attributes);
        return attributes ? intersection(allAttributes, attributes) : attributes;
      },

    },

    instanceMethods: {
      toJSON,
    },
  },
});

export { Sequelize };
export default sequelize;
