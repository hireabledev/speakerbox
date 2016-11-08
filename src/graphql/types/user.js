import {
  GraphQLObjectType,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import User from '../../lib/models/user.model';

export default new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: attributeFields(User, {
    commentToDescription: true,
  }),
});
