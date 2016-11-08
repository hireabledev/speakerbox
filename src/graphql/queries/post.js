import {
  GraphQLList,
} from 'graphql';
import { defaultArgs, defaultListArgs, resolver } from 'graphql-sequelize';
import Post from '../../lib/models/post.model';
import postType from '../types/post';
import { applyMiddleware, authenticated, scopeToUser } from '../utils';

export const posts = {
  type: new GraphQLList(postType),
  args: defaultListArgs(Post),
  resolve: resolver(Post, {
    before: applyMiddleware(authenticated, scopeToUser),
  }),
};

export const post = {
  type: postType,
  args: defaultArgs(Post),
  resolve: resolver(Post, {
    before: applyMiddleware(authenticated, scopeToUser),
  }),
};
