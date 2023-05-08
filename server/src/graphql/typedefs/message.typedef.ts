import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './user.typedef';

export const MessageType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    userId: { type: GraphQLString },
    chatRoomId: { type: GraphQLString },
    user: { type: UserType },
  }),
});
