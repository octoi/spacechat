import axios from 'axios';
import { showToast } from '@/lib/show-toast';
import { ChatListType } from '@/lib/types';
import { getFullURL } from '@/lib/url';
import { createStore } from 'zustand/vanilla';
import { userStore } from './user.store';

interface ChatListStore {
  chats: ChatListType[];
  chatsLoading: boolean;
  loadChats: () => Promise<void>;
}

export const chatListStore = createStore<ChatListStore>((set) => ({
  chats: [],
  chatsLoading: false,
  loadChats() {
    return new Promise((resolve, reject) => {
      const { user } = userStore.getState();

      if (!user) return;

      set({ chatsLoading: true });
      axios
        .get(getFullURL('/user/chat'), {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(({ data }) => {
          set({ chats: data });
          resolve();
        })
        .catch((err) => {
          let details = {
            title: 'Failed to send request',
            description: err?.message,
          };

          if (err?.response?.data) {
            details.title = 'Failed to retrieve chats';
            details.description = err.response.data.message;
          }

          showToast({
            ...details,
            status: 'error',
          });

          set({ chats: [] });
          reject();
        })
        .finally(() => set({ chatsLoading: false }));
    });
  },
}));
