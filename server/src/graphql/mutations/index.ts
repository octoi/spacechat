import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return 'hello';
      },
    },
  }),
});
