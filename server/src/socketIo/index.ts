import { Server as SocketServer } from 'socket.io';
import { AppSocket, Events } from './types';

export const handleSocketConnection = (io: SocketServer) => {
  io.on(Events.Connection, (socket: AppSocket) => {});
};
