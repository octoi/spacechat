import { prismaClient } from './prisma';

interface CreateChatRoomData {
  creatorId: string;
  name: string;
  profile: string;
}

export const createChatRoom = (data: CreateChatRoomData) => {
  return prismaClient.chatRoom.create({
    data: {
      ...data,
      members: {
        connect: {
          id: data.creatorId,
        },
      },
      admins: {
        connect: {
          id: data.creatorId,
        },
      },
    },
  });
};

interface UpdateChatRoomData {
  roomId: string;
  name?: string;
  profile?: string;
  description?: string;
}

export const updateChatRoom = (data: UpdateChatRoomData) => {
  return prismaClient.chatRoom.update({
    where: {
      id: data.roomId,
    },
    data,
  });
};

export const deleteChatRoom = (roomId: string) => {
  return prismaClient.chatRoom.delete({
    where: {
      id: roomId,
    },
  });
};

export const getChatRoom = (roomId: string) => {
  return prismaClient.chatRoom.findUnique({
    where: { id: roomId },
    include: {
      _count: true,
      admins: true,
      members: true,
    },
  });
};

export const addMember = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  return prismaClient.chatRoom.update({
    where: { id: roomId },
    data: {
      members: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const makeAdmin = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  return prismaClient.chatRoom.update({
    where: { id: roomId },
    data: {
      admins: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const dismissAdmin = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  return prismaClient.chatRoom.update({
    where: { id: roomId },
    data: {
      admins: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
};

export const removeMember = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  return prismaClient.chatRoom.update({
    where: { id: roomId },
    data: {
      members: {
        disconnect: {
          id: userId,
        },
      },
      admins: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
};

// check if given user is admin of given chat room

export const authenticateChatRoomAdmin = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  return prismaClient.chatRoom.findFirst({
    where: {
      id: roomId,
      admins: {
        some: {
          id: userId,
        },
      },
    },
  });
};
