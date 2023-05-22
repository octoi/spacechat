import React, { useState } from 'react';
import { ClipboardSignature } from 'lucide-react';
import { Button, Heading, Input } from '@chakra-ui/react';

interface Props {
  onToggleButtonClick: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onToggleButtonClick }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Heading fontSize='3xl' mb={5}>
        Register
      </Heading>
      <Input
        size='lg'
        variant='filled'
        className='bg-app-dark3 text-app-text'
        placeholder='Name'
        required
      />
      <Input
        mt={3}
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
      <Button
        mt={3}
        className='btn-primary'
        rightIcon={<ClipboardSignature size={18} />}
      >
        Register
      </Button>
      <p className='mt-5 text-app-text2'>
        Already have an account ?{' '}
        <span
          onClick={onToggleButtonClick}
          className='text-app-text font-medium underline underline-offset-2 cursor-pointer transition-all duration-200 hover:opacity-80'
        >
          Login
        </span>
      </p>
    </div>
  );
};
