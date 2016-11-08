import { GraphQLString } from 'graphql';
import Sequelize from 'sequelize';
import { typeMapper } from 'graphql-sequelize';

typeMapper.mapType((type) => {
  if (type instanceof Sequelize.JSONB) {
    return GraphQLString;
  }
  return false;
});
