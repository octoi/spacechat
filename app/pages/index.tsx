import { AuthWrapper } from '@/components/authWrapper';
import { Layout } from '@/components/layout';
import { Sidebar } from '@/components/sidebar';

export default function HomePage() {
  return (
    <Layout>
      <AuthWrapper>
        <div className='flex w-full h-screen'>
          <Sidebar />
          <div className='w-full h-screen flex items-center justify-center'>
            <p className='text-3xl font-medium'>Let's Chat</p>
          </div>
        </div>
      </AuthWrapper>
    </Layout>
  );
}
