import { useEffect } from 'react';
import { ReactComponent } from '@/lib/types';
import { useRouter } from 'next/router';
import { userStore } from '@/store/user.store';
import { Paths } from '@/lib/constants';
import { useStore } from 'zustand';

export const AuthWrap: ReactComponent = ({ children }) => {
  const router = useRouter();
  const { user } = useStore(userStore);

  useEffect(() => {
    if (!user) {
      router.push(Paths.login); // passing current path in order to redirect back to same page after login
    }
  }, [user]);

  return children;
};
