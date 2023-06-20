import React, { useEffect, useState } from 'react';
import { ReactComponent } from '@/lib/types/react.type';
import { UserType } from '@/lib/types/user.type';
import { getApolloClient } from '@/lib/apollo';
import { GET_USER_DETAILS } from '@/graphql/account/account.query';
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
  Flex,
  Skeleton,
  SkeletonCircle,
  Avatar,
} from '@chakra-ui/react';

export const NewPersonalChatWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const client = getApolloClient();

  const [targetUsername, setTargetUsername] = useState('');
  const [targetUser, setTargetUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onClose = () => {
    setTargetUsername('');
    setLoading(false);
    setError('');
    setTargetUser(null);
    closeModal();
  };

  useEffect(() => {
    setTargetUser(null);
    setError('');

    if (targetUsername.trim().length == 0) return;
    setLoading(true);

    client
      .query({
        query: GET_USER_DETAILS,
        variables: { username: targetUsername },
      })
      .then(({ data }) => setTargetUser(data?.getUser))
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false));
  }, [targetUsername]);

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
            {!loading && error && (
              <p className='mt-5 text-lg text-red-300 font-medium'>{error}</p>
            )}
            {loading && (
              <Flex mt={5} w='full' alignItems='center'>
                <SkeletonCircle size='12' />
                <div className='w-full'>
                  <Skeleton ml={2} w='full' h={3} />
                  <Skeleton mt={1} ml={2} w='full' h={3} />
                </div>
              </Flex>
            )}
            {!loading && !error && targetUser && (
              <Flex mt={5} alignItems='center'>
                <Avatar src={targetUser.profile} name={targetUser.name} />
                <div className='ml-3'>
                  <h2 className='text-lg'>{targetUser.name}</h2>
                  <h2 className='text-app-text2'>{targetUser.username}</h2>
                </div>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button className='btn-primary' isDisabled={!targetUser || loading}>
              Chat now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
