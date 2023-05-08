import { GraphQLError, GraphQLList, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { MessageType } from '../typedefs/message.typedef';
import { ValidatorMessage } from '@/utils/constants';
import { isChatRoomMember } from '@/models/chatroom.model';
import { getUserFromContext } from '@/utils/jwt';
import { getChatMessages } from '@/models/message.model';

export const GetRoomMessages: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(MessageType),
  args: {
    roomId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    if (!requestArgs?.roomId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);

    await isChatRoomMember({
      userId: user?.id,
      roomId: requestArgs?.roomId,
    }).catch(() => {
      throw new GraphQLError('Permission denied');
    });

    const message = await getChatMessages(requestArgs?.roomId).catch((err) => {
      throw new GraphQLError(err?.message);
    });

    return message;
  },
};
