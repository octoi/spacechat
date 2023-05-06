import { GraphQLSchema } from 'graphql';
import { Queries } from './queries';
import { Mutations } from './mutations';

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
