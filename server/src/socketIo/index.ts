import { Server as SocketServer } from 'socket.io';
import { AppSocket, Events } from './types';
import { redisUtil } from '@/utils/redis';
import {
  markMessagesAsReceivedModel,
  markMessagesAsSeenModel,
  sendMessageModel,
} from '@/models/message.model';

export const handleSocketConnection = (io: SocketServer) => {
  io.on(Events.Connection, (socket: AppSocket) => {
    // store userID and socketID to redis
    socket.on('connect', ({ userId }) => {
      redisUtil.store({
        userId,
        socketId: socket.id,
      });

      // mark all user messages as received
      markMessagesAsReceivedModel(userId);
    });

    // mark messages as seen
    socket.on('markAsSeen', async ({ targetId }, callback) => {
      const userId = await redisUtil.get(socket.id);
      if (!userId) {
        callback({
          status: false,
          message: 'Failed to get userID from redis store.',
        });
        return;
      }

      markMessagesAsSeenModel({ senderId: parseInt(userId), targetId })
        .then(() => callback({ status: true }))
        .catch(() =>
          callback({
            status: false,
            message: 'Failed to mark messages as seen.',
          })
        );
    });

    // send message
    socket.on('message', async (data, callback) => {
      const userId = await redisUtil.get(socket.id);
      if (!userId) {
        callback({
          status: false,
          message: 'Failed to get userID from redis store.',
        });
        return;
      }

      const targetSocketId = await redisUtil.get(data.targetId.toString());

      sendMessageModel({
        ...data,
        status: targetSocketId ? 'RECEIVED' : 'SENT', // if target is online mark message as received
      })
        .then(async (message: any) => {
          if (!targetSocketId) return;

          io.to(targetSocketId).emit('message', message);

          callback({ status: true, data: { status: 'SENT' } });
        })
        .catch(() =>
          callback({ status: false, message: 'Failed to send message.' })
        );
    });

    // remove user details from redis
    socket.on('disconnect', () => {
      redisUtil.delete(socket.id);
    });
  });
};
