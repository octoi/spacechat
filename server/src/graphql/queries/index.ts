import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return 'hello';
      },
    },
  }),
});
