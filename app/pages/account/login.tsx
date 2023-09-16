import _ from 'lodash';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';
import { Button, Center, Flex, Input } from '@chakra-ui/react';
import { Paths } from '@/lib/constants';
import { getFullURL } from '@/lib/url';
import { showToast } from '@/lib/show-toast';
import { setUser } from '@/lib/user';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (_.isEmpty(username) || _.isEmpty(password)) {
      return;
    }

    setLoading(true);

    axios
      .post(getFullURL('/user/login'), {
        username,
        password,
      })
      .then(({ data }) => {
        showToast({
          title: 'Logged in successfully',
          description: `Welcome back ${data?.name}`,
          status: 'success',
        });

        setUser(data);
        router.push(Paths.home);
      })
      .catch((err) => {
        let details = {
          title: 'Login request failed',
          description: err?.message,
        };

        if (err?.response?.data) {
          details.title = 'Login failed';
          details.description = err.response.data.message;
        }

        showToast({
          ...details,
          status: 'error',
        });
      })
      .finally(() => setLoading(false));
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
              onChange={(e) => setUsername(e.target.value.trim())}
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
              isDisabled={loading || _.isEmpty(username) || _.isEmpty(password)}
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
