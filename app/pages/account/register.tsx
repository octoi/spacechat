import _ from 'lodash';
import Link from 'next/link';
import axios from 'axios';
import { Layout } from '@/components/layout';
import { Paths } from '@/lib/constants';
import { ClipboardSignature } from 'lucide-react';
import { Button, Center, Flex, Heading, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getFullURL } from '@/lib/url';
import { showToast } from '@/lib/show-toast';
import { setUser } from '@/lib/user';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (_.isEmpty(username) || _.isEmpty(password) || _.isEmpty(name.trim())) {
      return;
    }

    setLoading(true);

    axios
      .post(getFullURL('/user/register'), {
        name,
        username,
        password,
      })
      .then(({ data }) => {
        showToast({
          title: 'Register account successfully',
          description: `Hello ${data?.name} 👋`,
          status: 'success',
        });

        setUser(data);
        router.push(Paths.home);
      })
      .catch((err) => {
        let details = {
          title: 'Register request failed',
          description: err?.message,
        };

        if (err?.response?.data) {
          details.title = 'Register failed';
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
    <Layout title='Register'>
      <Center mt={10}>
        <Flex direction='column' p={8} className='w-full max-w-xl'>
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
              isDisabled={
                loading ||
                _.isEmpty(username) ||
                _.isEmpty(password) ||
                _.isEmpty(name.trim())
              }
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
