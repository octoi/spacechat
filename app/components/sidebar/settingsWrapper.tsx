import React from 'react';
import { ReactComponent } from '@/lib/types/react.type';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Center,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { userStore } from '@/store/user.store';
import { ImagePlus } from 'lucide-react';

export const SettingsWrapper: ReactComponent = ({ children }) => {
  const user = userStore.getState().user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  if (!user) return null;

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent className='bg-app-dark3'>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <Center className='relative group'>
              <Avatar src={user.profile} name={user.name} size='2xl' />
              <Avatar
                size='2xl'
                icon={<ImagePlus />}
                className='bg-black bg-opacity-60 cursor-pointer transition-all duration-200 opacity-0 absolute group-hover:opacity-100'
              />
            </Center>
            <div className='mt-10'>
              <p className='mb-2 text-app-text2'>Your Name</p>
              <Input
                placeholder='Your Name'
                size='lg'
                value={user.name}
                variant='filled'
              />
              <p className='my-2 text-app-text2'>Username</p>
              <Input
                placeholder='Username'
                size='lg'
                value={user.username}
                variant='filled'
              />
              <p className='my-2 text-app-text2'>New Password</p>
              <Input placeholder='New Password' size='lg' variant='filled' />
              <p className='my-2 text-app-text2'>About</p>
              <Textarea
                placeholder='About'
                value={user.about}
                variant='filled'
                size='lg'
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
