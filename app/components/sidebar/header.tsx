import React from 'react';
import { userStore } from '@/store/user.store';
import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { LuMessageSquarePlus } from 'react-icons/lu';
import { LogoutWrapper } from './logout-wrapper';

export const SidebarHeader: React.FC = () => {
  const { user } = userStore.getState();

  if (!user) return null;

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      className='bg-app-dark2 w-full p-5 sticky top-0'
    >
      <Avatar src={user?.profile} name={user.name} size='lg' />
      <Flex alignItems='center'>
        <IconButton
          aria-label='Setting'
          icon={<LuMessageSquarePlus className='text-2xl' />}
          variant='ghost'
          rounded='full'
          size='lg'
          className='text-app-text2 hover:text-app-text'
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Settings'
            icon={<FiSettings className='text-2xl' />}
            variant='ghost'
            rounded='full'
            size='lg'
            className='text-app-text2 hover:text-app-text'
          />
          <MenuList className='bg-app-dark3'>
            <LogoutWrapper>
              <MenuItem
                className='bg-app-dark3 hover:bg-app-dark4'
                icon={<FiLogOut />}
              >
                Logout
              </MenuItem>
            </LogoutWrapper>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
