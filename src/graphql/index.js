import express from 'express';
import graphqlHTTP from 'express-graphql';
import { IS_DEV } from '../lib/config';
import schema from './schema';

// Routes
const app = express();

app.use(graphqlHTTP({
  schema,
  graphiql: true,
  pretty: IS_DEV,
}));

export default app;
