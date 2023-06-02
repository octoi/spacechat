import React from 'react';
import { userStore } from '@/store/user.store';
import { LogoutWrapper } from './logoutWrapper';
import { SettingsWrapper } from './settingsWrapper';
import {
  LogOutIcon,
  MessageSquarePlusIcon,
  MoreVertical,
  SettingsIcon,
} from 'lucide-react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';

export const Profile: React.FC = () => {
  const user = userStore.getState().user;

  if (!user) return null;

  return (
    <div className='bg-app-dark3 p-5 flex items-center justify-between'>
      <SettingsWrapper>
        <Avatar
          src={user.profile}
          name={user.name}
          className='cursor-pointer'
        />
      </SettingsWrapper>
      <div className='flex items-center space-x-2'>
        <Tooltip label='New chat' className='bg-app-dark4 text-app-text'>
          <IconButton
            aria-label='New chat'
            icon={<MessageSquarePlusIcon />}
            borderRadius='full'
            size='lg'
            variant='ghost'
            className='hover:bg-app-dark4'
          />
        </Tooltip>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<MoreVertical />}
            borderRadius='full'
            size='lg'
            variant='ghost'
            className='hover:bg-app-dark4'
          />
          <MenuList className='bg-app-dark3'>
            <MenuItem
              className='bg-app-dark3 hover:bg-app-dark4'
              icon={<MessageSquarePlusIcon size={18} />}
            >
              New chat
            </MenuItem>
            <SettingsWrapper>
              <MenuItem
                className='bg-app-dark3 hover:bg-app-dark4'
                icon={<SettingsIcon size={18} />}
              >
                Settings
              </MenuItem>
            </SettingsWrapper>
            <LogoutWrapper>
              <MenuItem
                className='bg-app-dark3 hover:bg-app-dark4'
                icon={<LogOutIcon size={18} />}
              >
                Logout
              </MenuItem>
            </LogoutWrapper>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
