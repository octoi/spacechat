import React, { useState } from 'react';
import { ReactComponent } from '@/lib/types/react.type';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from '@chakra-ui/react';

export const NewPersonalChatWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [targetUsername, setTargetUsername] = useState('');

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>New personal chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Username'
              variant='filled'
              size='lg'
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button className='btn-primary'>Chat now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
