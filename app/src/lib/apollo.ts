import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from './cookie';
import { GRAPHQL_ENDPOINT } from './constants';

export const getApolloClient = () => {
  const token = getToken();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
