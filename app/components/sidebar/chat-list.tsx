import _ from 'lodash';
import time from '@/lib/time';
import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import { chatListStore } from '@/store/chatlist.store';
import { userStore } from '@/store/user.store';
import { BsCheck } from 'react-icons/bs';
import { Avatar, Flex, Skeleton, Tag, Text } from '@chakra-ui/react';
import { cn } from '@/lib/utils';

export const ChatList: React.FC = () => {
  const { user } = useStore(userStore);
  const { chats, chatsLoading, loadChats } = useStore(chatListStore);

  useEffect(() => {
    if (!user) return;
    loadChats();
  }, [user]);

  return (
    user && (
      <div className='w-full'>
        {chatsLoading && (
          <>
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
            <Skeleton p={10} startColor='#1E2330' endColor='#2A3146' mt={2} />
          </>
        )}
        {!_.isEmpty(chats) &&
          chats.map((chat, idx) => {
            console.log(chat);

            return (
              <Flex
                key={idx}
                p={5}
                alignItems='center'
                className='cursor-pointer transition-all duration-100 hover:bg-app-dark2/60'
              >
                <Avatar src={chat?.profile} name={chat?.name} size='lg' />
                <div className='ml-3 w-full'>
                  <Flex
                    alignItems='center'
                    justifyContent='space-between'
                    w='full'
                  >
                    <Text fontSize='lg' className='text-app-text font-medium'>
                      {chat.name}
                    </Text>

                    <Text
                      className={cn(
                        'shadow',
                        chat._count.sent !== 0 && 'text-app-accent font-medium',
                        chat._count.sent === 0 && 'text-app-text2'
                      )}
                    >
                      {/* {time.calendar(chat.sent[0].createdAt)} */}
                    </Text>
                  </Flex>
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                      {/* <>
                        {chat.sent[0].status == 'SENT' && <BsCheck />}
                        {chat.sent[0].status == 'RECEIVED' && <BsCheck />}
                        {chat.sent[0].status == 'SEEN' && <BsCheck />}
                      </> */}
                      <Text className='text-app-text2'>
                        {/* {chat.sent[0].message} */}
                      </Text>
                    </Flex>
                    <Tag
                      size='lg'
                      className={cn(
                        'bg-app-accent rounded-full',
                        chat._count.sent == 0 && 'opacity-0'
                      )}
                    >
                      {chat._count.sent}
                    </Tag>
                  </Flex>
                </div>
              </Flex>
            );
          })}
      </div>
    )
  );
};
