import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default function configureClient() {
  const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    },
  });

  return new ApolloClient({
    networkInterface,
  });
}
