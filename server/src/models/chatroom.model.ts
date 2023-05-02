import { prismaClient } from './prisma';

interface CreateChatRoomData {
  name: string;
  profile: string;
}

export const createChatRoom = (creatorId: string, data: CreateChatRoomData) => {
  return new Promise((resolve, reject) => {
    prismaClient.chatRoom
      .create({
        data: {
          ...data,
          members: {
            connect: {
              id: creatorId,
            },
          },
          admins: {
            connect: {
              id: creatorId,
            },
          },
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to create chat room'));
  });
};
