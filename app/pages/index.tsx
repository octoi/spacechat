import { AuthWrap } from '@/components/auth-wrap';
import { Layout } from '@/components/layout';
import { Sidebar } from '@/components/sidebar';
import { Flex } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Layout title='Spacechat'>
      <AuthWrap>
        <Flex>
          <Sidebar />
        </Flex>
      </AuthWrap>
    </Layout>
  );
}
