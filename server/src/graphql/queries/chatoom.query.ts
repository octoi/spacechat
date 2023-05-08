import { GraphQLError, GraphQLList, GraphQLString } from 'graphql';
import { ChatRoomType } from '../typedefs/chatroom.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { ValidatorMessage } from '@/utils/constants';
import { getUserFromContext } from '@/utils/jwt';
import {
  getChatRoom,
  getUserChatRooms,
  isChatRoomMember,
} from '@/models/chatroom.model';

export const GetChatRoomQuery: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await isChatRoomMember({ userId: user?.id, roomId: requestArgs?.id }).catch(
      () => {
        throw new GraphQLError('Permission denied');
      }
    );

    const chatRoom = await getChatRoom(requestArgs?.roomId).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return chatRoom;
  },
};

export const GetUserChatRoomsQuery: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(ChatRoomType),
  async resolve(_, __, context) {
    const user: any = getUserFromContext(context);

    const chatRooms = await getUserChatRooms(user?.id).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return chatRooms;
  },
};
