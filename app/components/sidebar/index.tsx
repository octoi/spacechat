import React from 'react';
import { Profile } from './profile';

export const Sidebar: React.FC = () => {
  return (
    <div className='h-screen w-[30%] bg-app-dark1'>
      <Profile />
    </div>
  );
};
