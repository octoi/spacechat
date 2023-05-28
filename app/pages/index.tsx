import { AuthWrapper } from '@/components/authWrapper';
import { Layout } from '@/components/layout';

export default function HomePage() {
  return (
    <Layout>
      <AuthWrapper>
        <div className='flex w-full h-screen'>
          <div className='h-screen w-[30%] bg-app-dark1'></div>
          <div className='w-full h-screen flex items-center justify-center'>
            <p className='text-3xl font-medium'>Let's Chat</p>
          </div>
        </div>
      </AuthWrapper>
    </Layout>
  );
}
