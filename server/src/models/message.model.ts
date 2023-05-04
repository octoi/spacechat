import { prismaClient } from './prisma';

interface CreateMessageData {
  userId: string;
  chatRoomId: string;
  message: string;
  type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
}

export const createMessage = (data: CreateMessageData) => {
  return prismaClient.message.create({
    data: {
      ...data,
      seenBy: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
};

export const deleteMessage = (messageId: string) => {
  return prismaClient.message.delete({
    where: {
      id: messageId,
    },
  });
};
