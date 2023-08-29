import { Socket } from 'socket.io';

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export enum Events {
  Connection = 'connection',
  Disconnect = 'disconnect',
}

type CallbackFn = (data: {
  status: boolean;
  message?: string;
  data?: any;
}) => void;

export interface ServerToClientEvents {
  message: (message: {
    id: number;
    type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    message: string;
    createdAt: any;
    status: 'SENT' | 'RECEIVED' | 'SEEN';
  }) => void;
}

export interface ClientToServerEvents {
  connect: (data: { userId: number }) => void; // store userID and socketId to redis
  message: (
    message: {
      senderId: number;
      targetId: number;
      type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
      message: string;
    },
    callback: CallbackFn
  ) => void; //  store & send message to target
  markAsSeen: (data: { targetId: number }, callback: CallbackFn) => void; // mark target messages as seen
}
