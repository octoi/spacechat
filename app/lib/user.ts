import { userStore } from '@/store/user.store';
import { setToken, removeToken } from './cookie';

const { setUser: setStoreUser, removeUser } = userStore.getState();

export const setUser = (userData: any) => {
  setToken(userData?.token);
  setStoreUser(userData);
};

export const logoutUser = () => {
  removeToken();
  removeUser();
};
