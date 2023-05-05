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

export const getChatMessages = (roomId: string) => {
  return prismaClient.message.findMany({
    where: {
      chatRoomId: roomId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          profile: true,
        },
      },
    },
  });
};

export const markAsSeen = ({
  userId,
  messageId,
}: {
  userId: string;
  messageId: string;
}) => {
  return prismaClient.message.update({
    where: { id: messageId },
    data: {
      seenBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
