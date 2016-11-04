import os from 'os';
import Sequelize from 'sequelize';
import { assign, startCase } from 'lodash';
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
            model: this.sequelize.models.user,
            where: { id: userId },
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

      findAllAndPaginate(options) {
        return this.findAll(assign({}, options, { limit: options.limit + 1 }))
          .then(data => {
            let more = false;

            if (data.length > options.limit) {
              more = true;
            }

            return {
              more,
              data: data.slice(0, options.limit),
            };
          });
      },

      scopeForUser(user, queryUser, defaultScoped) {
        if (user.isAdmin) {
          if (queryUser) {
            if (queryUser === 'all') {
              return this;
            }
            return this.scope({ method: ['user', queryUser] });
          } else if (defaultScoped === true) {
            return this.scope({ method: ['user', user.id] });
          }
          return this;
        }
        return this.scope({ method: ['user', user.id] });
      },

    },
  },
});

export { Sequelize };
export default sequelize;
