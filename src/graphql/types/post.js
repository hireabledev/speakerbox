import {
  GraphQLObjectType,
} from 'graphql';
import { attributeFields, resolver } from 'graphql-sequelize';
import Post from '../../lib/models/post.model';
import User from '../../lib/models/user.model';
import userType from './user';

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Post',
  fields: {
    ...attributeFields(Post, {
      commentToDescription: true,
    }),
    user: {
      type: userType,
      resolve: resolver(User),
    },
  },
});
