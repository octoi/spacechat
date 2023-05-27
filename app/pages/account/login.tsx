import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';
import { LOGIN_USER } from '@/graphql/account/account.mutation';
import { showToast } from '@/lib/showToast';
import { setUser } from '@/lib/user';
import { Paths } from '@/lib/constants';
import { Button, Center, Flex, Input } from '@chakra-ui/react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    loginUser({ variables: { username, password } })
      .then(({ data }) => {
        const loginData = data?.login;
        setUser(loginData);
        showToast({
          title: `Welcome back ${loginData?.name} 🥳`,
          description: 'Logged in successfully',
          status: 'success',
        });

        // redirect to next path, if it is given
        let nextPath = router.query?.next;

        if (typeof nextPath != 'string') {
          nextPath = Paths.home;
        }

        router.push(nextPath);
      })
      .catch((err) => {
        showToast({
          title: 'Failed to login',
          description: err?.message,
          status: 'error',
          duration: 5000,
        });
      })
      .finally(() => {
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Layout title='Login'>
      <Center mt={10}>
        <Flex direction='column' p={8} className='w-full max-w-xl'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-3xl font-bold mb-5'>Login</h2>
            <Input
              placeholder='Username'
              size='lg'
              variant='filled'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
            <Input
              placeholder='Password'
              type='password'
              size='lg'
              variant='filled'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mt={3}
              disabled={loading}
              required
            />
            <Button
              mt={3}
              size='lg'
              className='btn-primary'
              disabled={loading}
              isLoading={loading}
              type='submit'
              w='full'
            >
              Login
            </Button>
            <Link href={Paths.register}>
              <p className='mt-3 opacity-90 cursor-pointer transition duration-500 hover:underline'>
                Dont have an account ? Register
              </p>
            </Link>
          </form>
        </Flex>
      </Center>
    </Layout>
  );
}
