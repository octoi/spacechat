import { createStore } from 'zustand/vanilla';
import { UserType } from '@/lib/types';
import { getUserFromCookie } from '@/lib/cookie';

interface UserStore {
  user: UserType | null;
  setUser: (data: UserType) => void;
  removeUser: () => void;
}

export const userStore = createStore<UserStore>((set) => ({
  user: getUserFromCookie(),
  setUser: (data) => set({ user: data }),
  removeUser: () => set({ user: null }),
}));
