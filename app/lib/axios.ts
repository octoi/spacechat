import axios from 'axios';
import { getToken } from './cookie';
import { userStore } from '@/store/user.store';

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${getToken() || userStore.getState().user?.token}`,
  },
});

export default instance;
