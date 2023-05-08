import { GraphQLError, GraphQLString } from 'graphql';
import { getUserFromContext } from '@/utils/jwt';
import { ValidatorMessage } from '@/utils/constants';
import { ChatRoomType } from '../typedefs/chatroom.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { removeMember } from '@/models/chatroom.model';
import { makeAdmin } from '@/models/chatroom.model';
import { dismissAdmin } from '@/models/chatroom.model';
import {
  authenticateChatRoomAdmin,
  createChatRoom,
  updateChatRoom,
  addMember,
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
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const roomData = await updateChatRoom(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return roomData;
  },
};

export const AddMemberMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId || !requestArgs?.userId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await authenticateChatRoomAdmin({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const data = await addMember(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return data;
  },
};

export const RemoveMemberMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId || !requestArgs?.userId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await authenticateChatRoomAdmin({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const data = await removeMember(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return data;
  },
};

export const MakeAdminMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId || !requestArgs?.userId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await authenticateChatRoomAdmin({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const data = await makeAdmin(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return data;
  },
};

export const DismissAdminMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    roomId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId || !requestArgs?.userId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    await authenticateChatRoomAdmin({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const data = await dismissAdmin(requestArgs).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return data;
  },
};
