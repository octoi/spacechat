import { Container } from '@chakra-ui/react';
import { ReactComponent } from '../lib/types/react';
import { userStore } from '../store/user.store';
import { useState } from 'react';
import { LoginForm } from './account/login';
import { RegisterForm } from './account/register';

enum Page {
  Login,
  Register,
}

export const AuthWrapper: ReactComponent = ({ children }) => {
  const user = userStore.getState().user;

  const [currentPage, setCurrentPage] = useState(Page.Login);

  return (
    <>
      {user && children}
      {!user && (
        <Container
          maxW='container.sm'
          className='h-[90vh] flex flex-col justify-center'
        >
          <div className='mb-10 w-full flex items-center justify-center'>
            <img src='/logo.svg' alt='SpaceChat' className='w-28' />
          </div>
          {currentPage == Page.Login && (
            <LoginForm
              onToggleButtonClick={() => setCurrentPage(Page.Register)}
            />
          )}
          {currentPage == Page.Register && (
            <RegisterForm
              onToggleButtonClick={() => setCurrentPage(Page.Login)}
            />
          )}
        </Container>
      )}
    </>
  );
};
