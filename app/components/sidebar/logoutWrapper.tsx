import React from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '@/lib/user';
import { Paths } from '@/lib/constants';
import { ReactComponent } from '@/lib/types/react.type';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

export const LogoutWrapper: ReactComponent = ({ children }) => {
  const router = useRouter();

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent className='bg-app-dark3'>
            <AlertDialogHeader fontSize='xl' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody fontSize='lg'>
              Are you sure? Do you want to logout
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                className='bg-app-dark4 hover:bg-app-dark4/60'
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  logoutUser();
                  onClose();
                  router.push(Paths.login);
                }}
                ml={2}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
