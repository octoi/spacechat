import { createChatRoom } from '@/models/chatroom.model';
import { ChatRoomType } from '../typedefs/chatroom.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLError, GraphQLString } from 'graphql';
import { ValidatorMessage } from '@/utils/constants';
import { getUserFromContext } from '@/utils/jwt';

export const CreateChatRoomMutation: GraphQLDefaultFieldConfig = {
  type: ChatRoomType,
  args: {
    name: { type: GraphQLString },
    profile: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.name || !requestArgs?.profile) {
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
