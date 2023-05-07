import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const ChatRoomType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'ChatRoom',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    profile: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});
