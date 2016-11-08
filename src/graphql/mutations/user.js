import { GraphQLID } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import User from '../../lib/models/user.model';
import userType from '../types/user';

const ADD_ARGS = omit(attributeFields(User), ['id', 'created', 'updated']);
const EDIT_ARGS = omit(attributeFields(User), ['created', 'updated']);

export const addUser = {
  type: userType,
  args: ADD_ARGS,
  resolve(_, args) {
    return User.create(args);
  },
};

export const editUser = {
  type: userType,
  args: EDIT_ARGS,
  resolve(_, args) {
    return User.findOne({ where: { id: args.id } })
      .then(user => user.update(omit(args, 'id')));
  },
};

export const deleteUser = {
  type: GraphQLID,
  args: pick(attributeFields(User), 'id'),
  resolve(_, args) {
    return User.destroy({ where: { id: args.id } });
  },
};
