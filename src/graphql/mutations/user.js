import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import omit from 'lodash/omit';
import User from '../../lib/models/user.model';
import userType from '../types/user';
import { applyMiddleware, authenticated, admin } from '../utils';

export const addUser = {
  type: userType,
  args: attributeFields(User, {
    commentToDescription: true,
    exclude: ['id', 'created', 'updated', 'emailConfirmed', 'telConfirmed', 'role'],
  }),
  resolve: applyMiddleware(
    authenticated,
    admin,
    (_, args) => User.create(args)
  ),
};

export const editUser = {
  type: userType,
  args: attributeFields(User, {
    commentToDescription: true,
    exclude: ['created', 'updated', 'emailConfirmed', 'telConfirmed', 'role'],
    allowNull: true,
  }),
  resolve: applyMiddleware(
    authenticated,
    admin,
    (_, args, req) => {
      let userId = req.user.id;
      if (req.user.isAdmin && args.id) {
        userId = args.id;
      }
      return User
        .findOneOr404({ where: { id: userId } })
        .then(user => user.update(omit(args, 'id')));
    }
  ),
};

export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: applyMiddleware(
    authenticated,
    admin,
    (_, args, req) => {
      let userId = req.user.id;
      if (req.user.isAdmin && args.id) {
        userId = args.id;
      }
      return User
        .findOneOr404({ where: { id: userId } })
        .then(user => user.destroy());
    }
  ),
};
