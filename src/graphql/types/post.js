import {
  GraphQLObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import Post from '../../lib/models/post.model';

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Post',
  fields: attributeFields(Post, {
    commentToDescription: true,
  }),
});
