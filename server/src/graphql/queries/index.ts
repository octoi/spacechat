import { GraphQLObjectType } from 'graphql';
import { GetUserQuery } from './user.query';
import { GetChatRoomQuery, GetUserChatRoomsQuery } from './chatoom.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getUser: GetUserQuery,
    // chat room query
    getChatRoom: GetChatRoomQuery,
    getUserChatRooms: GetUserChatRoomsQuery,
  }),
});
