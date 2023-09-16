import React from 'react';
import { PropsWithChildren } from 'react';

export type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UserType {
  id: number;
  username: string;
  name: string;
  profile: string;
  about: string;
  token: string;
}

interface MessageType {
  id: number;
  type: 'TEXT' | 'VOICE' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  message: string;
  createdAt: Date;
  status: 'SENT' | 'RECEIVED' | 'SEEN';
  senderId: number;
  targetId: number;
}

export interface ChatListType {
  id: number;
  name: string;
  username: string;
  profile?: string;
  sent: [MessageType];
  _count: {
    sent: number;
  };
}
