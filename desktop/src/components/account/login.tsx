import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Button, Heading, Input } from '@chakra-ui/react';

interface Props {
  onToggleButtonClick: () => void;
}

export const LoginForm: React.FC<Props> = ({ onToggleButtonClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Heading fontSize='3xl' mb={5}>
        Login
      </Heading>
      <Input
        size='lg'
        variant='filled'
        className='bg-app-dark3 text-app-text'
        placeholder='Username'
        required
      />
      <Input
        mt={3}
        size='lg'
        variant='filled'
        className='bg-app-dark3 text-app-text'
        placeholder='Password'
        type='password'
        required
      />
      <Button mt={3} className='btn-primary' rightIcon={<LogIn size={18} />}>
        Login
      </Button>
      <p className='mt-5 text-app-text2'>
        Don't have an account ?{' '}
        <span
          onClick={onToggleButtonClick}
          className='text-app-text font-medium underline underline-offset-2 cursor-pointer transition-all duration-200 hover:opacity-80'
        >
          Register
        </span>
      </p>
    </div>
  );
};
