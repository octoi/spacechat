import { GraphQLObjectType } from 'graphql';
import { GetUserQuery } from './user.query';
import { GetChatRoomQuery, GetUserChatRoomsQuery } from './chatoom.query';
import { GetRoomMessages } from './message.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    // user query
    getUser: GetUserQuery,
    // chat room query
    getChatRoom: GetChatRoomQuery,
    getUserChatRooms: GetUserChatRoomsQuery,
    // messages
    getChatMessages: GetRoomMessages,
  }),
});
