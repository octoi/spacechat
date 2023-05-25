import create from 'zustand/vanilla';
import { UserType } from '@/lib/types/user.type';
import { getUserFromCookie } from '@/lib/cookie';

interface UserStore {
  user: UserType | null;
  setUser: (data: UserType) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: getUserFromCookie(),
  setUser: (data) => set({ user: data }),
  removeUser: () => set({ user: null }),
}));
