import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import omit from 'lodash/omit';
import User from '../../lib/models/user.model';
import userType from '../types/user';

export const addUser = {
  type: userType,
  args: attributeFields(User, {
    commentToDescription: true,
    exclude: ['id', 'created', 'updated', 'emailConfirmed', 'telConfirmed', 'role'],
  }),
  resolve(_, args) {
    return User.create(args);
  },
};

export const editUser = {
  type: userType,
  args: attributeFields(User, {
    commentToDescription: true,
    exclude: ['created', 'updated', 'emailConfirmed', 'telConfirmed', 'role'],
    allowNull: true,
  }),
  resolve(_, args, req) {
    let userId = req.user.id;
    if (req.user.isAdmin && args.id) {
      userId = args.id;
    }
    return User
      .findOneOr404({ where: { id: userId } })
      .then(user => user.update(omit(args, 'id')));
  },
};

export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_, args, req) {
    let userId = req.user.id;
    if (req.user.isAdmin && args.id) {
      userId = args.id;
    }
    return User
      .findOneOr404({ where: { id: userId } })
      .then(user => user.destroy());
  },
};
