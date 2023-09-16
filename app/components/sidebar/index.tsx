import React from 'react';
import { SidebarHeader } from './header';
import { ChatList } from './chat-list';

export const Sidebar: React.FC = () => {
  return (
    <div className='bg-app-dark1 w-full max-w-lg h-screen overflow-y-scroll'>
      <SidebarHeader />
      <ChatList />
    </div>
  );
};
