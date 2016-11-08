import {
  GraphQLList,
} from 'graphql';
import { defaultArgs, defaultListArgs, resolver } from 'graphql-sequelize';
import User from '../../lib/models/user.model';
import userType from '../types/user';
import { applyMiddleware, authenticated } from '../utils';

function scopeToUser(options, args, req) {
  const result = {
    ...options,
  };
  if (!req.user.isAdmin) {
    result.where = { id: req.user.id };
  }
  return result;
}

export const users = {
  type: new GraphQLList(userType),
  args: defaultListArgs(User),
  resolve: resolver(User, {
    before: applyMiddleware(authenticated, scopeToUser),
  }),
};

export const user = {
  type: userType,
  args: defaultArgs(User),
  resolve: resolver(User, {
    before: applyMiddleware(authenticated, scopeToUser),
  }),
};
