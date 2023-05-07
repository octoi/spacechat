import { GraphQLObjectType } from 'graphql';
import { GetUserQuery } from './user.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getUser: GetUserQuery,
  }),
});
