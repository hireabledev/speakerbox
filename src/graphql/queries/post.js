import {
  GraphQLList,
} from 'graphql';
import { defaultArgs, defaultListArgs, resolver } from 'graphql-sequelize';
import Post from '../../lib/models/post.model';
import postType from '../types/post';
import { scopeToUser } from './';

export const posts = {
  type: new GraphQLList(postType),
  args: defaultListArgs(Post),
  resolve: resolver(Post, {
    before: scopeToUser,
  }),
};

export const post = {
  type: postType,
  args: defaultArgs(Post),
  resolve: resolver(Post, {
    before: scopeToUser,
  }),
};
