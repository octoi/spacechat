import { GraphQLError, GraphQLString } from 'graphql';
import { getUserFromContext } from '@/utils/jwt';
import { ValidatorMessage } from '@/utils/constants';
import { ChatRoomType } from '../typedefs/chatroom.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import {
  authenticateChatRoomAdmin,
  createChatRoom,
  updateChatRoom,
} from '@/models/chatroom.model';

export const CreateChatRoomMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    name: { type: GraphQLString },
    profile: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.name || !requestArgs?.profile || !requestArgs?.type) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);

    const chatRoom = await createChatRoom({
      ...requestArgs,
      creatorId: user?.id,
    }).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return chatRoom;
  },
};

export const UpdateChatRoomMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
    name: { type: GraphQLString },
    profile: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await authenticateChatRoomAdmin({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    const roomData = await updateChatRoom(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return roomData;
  },
};
