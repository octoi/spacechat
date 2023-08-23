import { prismaClient } from './prisma';

export const getMessagesModel = ({
  senderId,
  targetId,
  page = 0,
}: {
  senderId: number;
  targetId: number;
  page: number;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.message
      .findMany({
        where: {
          senderId: senderId,
          targetId: targetId,
        },
        skip: page * 20,
        take: 20,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to load messages'));
  });
};

export const sendMessageModel = ({
  senderId,
  targetId,
  message,
}: {
  senderId: number;
  targetId: number;
  message: string;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.message
      .create({
        data: {
          senderId,
          targetId,
          message,
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to send message'));
  });
};

export const markMessagesAsReceivedModel = (targetId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.message
      .updateMany({
        where: {
          targetId,
        },
        data: {
          status: 'RECEIVED',
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to mark status'));
  });
};

export const markMessagesAsSeenModel = ({
  senderId,
  targetId,
}: {
  senderId: number;
  targetId: number;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.message
      .updateMany({
        where: {
          senderId,
          targetId,
        },
        data: {
          status: 'SEEN',
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to mark status'));
  });
};
