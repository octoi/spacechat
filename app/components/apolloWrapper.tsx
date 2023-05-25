import { ApolloProvider } from '@apollo/client';
import { ReactComponent } from '@/lib/types/react.type';
import { getApolloClient } from '@/lib/apollo';

export const ApolloWrapper: ReactComponent = ({ children }) => {
  const client = getApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
