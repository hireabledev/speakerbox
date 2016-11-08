import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import './types';

import * as userQueries from './queries/user';
import * as userMutations from './mutations/user';
import * as postQueries from './queries/post';
import * as postMutations from './mutations/post';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQueries,
    ...postQueries,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...postMutations,
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
