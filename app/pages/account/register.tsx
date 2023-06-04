import Link from 'next/link';
import React, { useState } from 'react';
import { ClipboardSignature } from 'lucide-react';
import { Button, Center, Flex, Heading, Input } from '@chakra-ui/react';
import { Paths } from '@/lib/constants';
import { Layout } from '@/components/layout';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/account/account.mutation';
import { setUser } from '@/lib/user';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    registerUser({
      variables: {
        name,
        username,
        password,
        profile: encodeURI(
          `https://avatars.dicebear.com/api/identicon/${name}.svg`
        ),
      },
    })
      .then(({ data }) => {
        const registerData = data?.register;
        setUser(registerData);
        showToast({
          title: `Welcome ${name} to dove 🥳`,
          description: 'Account registered successfully',
          status: 'success',
        });
        router.push(Paths.home);
      })
      .catch((err) => {
        showToast({
          title: 'Failed to register',
          description: err?.message,
          status: 'error',
        });
      })
      .finally(() => {
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Layout title='Register'>
      <Center mt={10}>
        <Flex direction='column' className='w-full max-w-xl'>
          <Heading fontSize='3xl' mb={5}>
            Register
          </Heading>
          <form onSubmit={handleFormSubmit}>
            <Input
              size='lg'
              variant='filled'
              className='bg-app-dark3 text-app-text'
              placeholder='Name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <Input
              mt={3}
              size='lg'
              variant='filled'
              className='bg-app-dark3 text-app-text'
              placeholder='Username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              disabled={loading}
            />
            <Input
              mt={3}
              size='lg'
              variant='filled'
              className='bg-app-dark3 text-app-text'
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              mt={3}
              className='btn-primary'
              rightIcon={<ClipboardSignature size={18} />}
              size='lg'
              type='submit'
              w='full'
              isLoading={loading}
            >
              Register
            </Button>
          </form>
          <p className='mt-5 text-app-text2'>
            Already have an account ?{' '}
            <Link
              href={Paths.login}
              className='text-app-text font-medium underline underline-offset-2 cursor-pointer transition-all duration-200 hover:opacity-80'
            >
              Login
            </Link>
          </p>
        </Flex>
      </Center>
    </Layout>
  );
}
