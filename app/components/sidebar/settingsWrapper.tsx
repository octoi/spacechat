import React, { useState } from 'react';
import { ReactComponent } from '@/lib/types/react.type';
import { userStore } from '@/store/user.store';
import { ImagePlus } from 'lucide-react';
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

export const SettingsWrapper: ReactComponent = ({ children }) => {
  const user = userStore.getState().user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  if (!user) return null;

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [profile, setProfile] = useState<string | undefined>(user.profile);
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState(user.about || '');

  const fileInputRef = React.useRef<any>();

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
              <Avatar src={profile} name={user.name} size='2xl' />
              <Avatar
                size='2xl'
                icon={<ImagePlus />}
                className='bg-black bg-opacity-60 cursor-pointer transition-all duration-200 opacity-0 absolute group-hover:opacity-100'
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                className='hidden'
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setProfile(undefined);
                    return;
                  }

                  if (e.target.files[0].type.includes('image/')) {
                    let file = e.target.files[0];
                    let reader = new FileReader();

                    reader.onloadend = () => {
                      setProfile(URL.createObjectURL(file));
                    };

                    if (file) reader.readAsDataURL(file);
                  } else {
                    alert('Unsupported file type');
                  }
                }}
              />
            </Center>
            <div className='mt-10'>
              <p className='mb-2 text-app-text2'>Your Name</p>
              <Input
                placeholder='Your Name'
                size='lg'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='filled'
              />
              <p className='my-2 text-app-text2'>Username</p>
              <Input
                placeholder='Username'
                size='lg'
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                variant='filled'
              />
              <p className='my-2 text-app-text2'>New Password</p>
              <Input
                placeholder='New Password'
                size='lg'
                type='password'
                variant='filled'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className='my-2 text-app-text2'>About</p>
              <Textarea
                placeholder='About'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                variant='filled'
                size='lg'
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button className='btn-primary'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
