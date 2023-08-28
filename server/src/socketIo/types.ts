import { Socket } from 'socket.io';

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export enum Events {
  Connection = 'connection',
  Disconnect = 'disconnect',
}

export interface ServerToClientEvents {}

export interface ClientToServerEvents {}
