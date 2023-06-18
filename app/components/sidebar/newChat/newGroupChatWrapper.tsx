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

export const NewGroupChatWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupName, setGroupName] = useState('');

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>New group chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Group name'
              variant='filled'
              size='lg'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button className='btn-primary'>Create Group Chat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
