import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import { users, user } from './queries/user';
import { addUser, editUser, deleteUser } from './mutations/user';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users,
    user,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
    editUser,
    deleteUser,
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
