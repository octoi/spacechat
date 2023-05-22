import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../lib/apollo';
import { ReactComponent } from '../lib/types/react';

export const ApolloWrapper: ReactComponent = ({ children }) => {
  const client = getApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
