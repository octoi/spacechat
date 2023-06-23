import { createStore } from 'zustand/vanilla';

// store data of selected chat

interface ChatStore {
  currentChatId?: string;
  currentTargetUsername?: string;
  currentChatTitle?: string;
  currentChatProfile?: string;
  chatWithUser: (
    targetUsername: string,
    targetName: string,
    targetProfile: string
  ) => void; // show user profile to chat
  setChat: (chatId: string) => void; // set chat to given chat room
  clearChat: () => void; // clear selected chat
}

export const chatStore = createStore<ChatStore>((set) => ({
  currentChatId: '',
  currentTargetUsername: '',
  currentChatTitle: '',
  currentChatProfile: '',
  chatWithUser(targetUsername, targetName, targetProfile) {
    set({
      currentTargetUsername: targetUsername,
      currentChatTitle: targetName,
      currentChatProfile: targetProfile,
    });
  },
  setChat(chatId) {
    // load chat
    set({
      currentChatId: chatId,
      currentTargetUsername: '',
      // loaded chat data
      currentChatTitle: '',
      currentChatProfile: '',
    });
  },
  clearChat() {
    set({
      currentChatId: '',
      currentTargetUsername: '',
      currentChatTitle: '',
      currentChatProfile: '',
    });
  },
}));
