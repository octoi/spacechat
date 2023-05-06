import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    profile: { type: GraphQLString },
    about: { type: GraphQLString },
  }),
});
